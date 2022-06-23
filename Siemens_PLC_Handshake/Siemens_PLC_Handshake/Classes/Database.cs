using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using S7.Net;
using S7.Net.Types;
using MySql.Data.MySqlClient;

namespace Siemens_PLC_Handshake.Classes
{
    public class Database
    {
        private string DB_Connection = "datasource=localhost;port=3000;username=root;password=1234";

        private void DB_Execute_Command(string Query)
        {
            MySqlConnection MyConn = new MySqlConnection(DB_Connection);
            MySqlCommand MyCommand = new MySqlCommand(Query, MyConn);
            MySqlDataReader MyReader;
            MyConn.Open();
            MyReader = MyCommand.ExecuteReader();
            // Wait until Processes are done
            while (MyReader.Read())
            {
                Console.WriteLine("Processing Request...");
            }
            MyConn.Close();
        }



        public void AddVideo_OnDatabase(int video_id, Status_Information status_information)
        {
            int robot_id = 0;
            int video_done_playing = 0;    

            string date_Recorded = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            try
            {
                if (video_id > 0 && video_id < 120) 
                {
                    robot_id = 1;
                }else
                {
                    robot_id = 2;
                }
                
               
                string Query = "INSERT INTO robot_project_provik_presantation.video_history " +
                    "(robot_id, video_id, video_done_playing, history_date_recorded) VALUES " +
                    "('" + robot_id + "','" + video_id + "','" + video_done_playing + "','" + date_Recorded + "');";

                DB_Execute_Command(Query);

                Console.WriteLine("Robot id: " + robot_id);
                Console.WriteLine("Video id: " + video_id);
                Console.WriteLine("Video Done Playing: " + video_done_playing);
                Console.WriteLine("Recorded Date: " + date_Recorded);
            
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                string Query = "INSERT INTO robot_project_provik_presantation.event_logger " +
                    "(event_date_recorded, event_description) VALUES " +
                    "('" + date_Recorded + "','" + status_information.Database_WriteData_Error + "');";

                DB_Execute_Command(Query);
            }
        }



        public void Record_PLC_ConnectionStatus(string event_description)
        {
            string date_Recorded = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string Query = "INSERT INTO robot_project_provik_presantation.event_logger " +
             "(event_date_recorded, event_description) VALUES " +
             "('" + date_Recorded + "','" + event_description + "');";

            DB_Execute_Command(Query);
        }

        public void FetchLastVideoData()
        {

            string Query = "SELECT * FROM robot_project_provik_presantation.video_history ORDER BY history_id DESC LIMIT 1";

            MySqlConnection MyConn = new MySqlConnection(DB_Connection);
            MySqlCommand MyCommand = new MySqlCommand(Query, MyConn);
            MySqlDataReader MyReader;

            MyConn.Open();

            MyReader = MyCommand.ExecuteReader();

            while (MyReader.Read())
            {
          
            }
        }
    }
}
