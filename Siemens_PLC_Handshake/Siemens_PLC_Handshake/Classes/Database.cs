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



        public void RecordData(Plc Plc_Siemens, string PLC_Address_1, string PLC_Address_2, Status_Information statusMessage)
        {

            string date_Recorded = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            try
            {
                var temperature = ((uint)Plc_Siemens.Read(PLC_Address_1)).ConvertToFloat();
                var pressure = ((uint)Plc_Siemens.Read(PLC_Address_2)).ConvertToFloat();
                

                string Query = "INSERT INTO robot_project_provik_presantation.test_data " +
                    "(temperature, pressure, date_recorded) VALUES " +
                    "('" + temperature + "','" + pressure + "','" + date_Recorded + "');";

                DB_Execute_Command(Query);

                Console.WriteLine("Recorded Temperature: " + temperature);
                Console.WriteLine("Recorded Pressure: " + pressure);
                Console.WriteLine("Recorded Date: " + date_Recorded);
            
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                string Query = "INSERT INTO robot_project_provik_presantation.event_logger " +
                    "(event_date_recorded, event_description) VALUES " +
                    "('" + date_Recorded + "','" + statusMessage.Database_WriteData_Error + "');";

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
    }
}
