using System;
using S7.Net;
using S7.Net.Types;
using System.Threading;



namespace Siemens_PLC_Handshake
{
    internal class Program
    {

        static void Main(string[] args)
        {

            var Plc_Siemens = new Plc(CpuType.S71200, "192.168.10.10", 0, 1);
            var statusInformation = new Classes.Status_Information();
            var database = new Classes.Database();

            //Watches for operations
            var EventWatch = new System.Diagnostics.Stopwatch();
            var CommunicationWatch = new System.Diagnostics.Stopwatch();
            //End of watches for operations

            var PC_Request_Connection = new Classes.Bit_Info("DB1.DBX0.0", false);
            var PLC_Response_Connection = new Classes.Bit_Info("DB1.DBX0.1", false);
            var PC_Ready = new Classes.Bit_Info("DB1.DBX0.2", false);
            var PC_Busy = new Classes.Bit_Info("DB1.DBX0.3", true);
            var PLC_WriteData = new Classes.Bit_Info("DB1.DBX0.4", false);
            var TestConnection = new Classes.Bit_Info("DB1.DBX0.5", false);

            bool PC_Connection_Lost = false;



            //Open PLC Connection
            Plc_Siemens.Open();
            Console.WriteLine("Initialize Connection...");

            Plc_Siemens.Write(PC_Request_Connection.Address, false);
            Plc_Siemens.Write(PLC_Response_Connection.Address, false);
            Plc_Siemens.Write(PC_Ready.Address, false);
            Plc_Siemens.Write(PC_Busy.Address, true);
            statusInformation.Connection_Success_Recorded = false;

            //Starting Connection Process
            Plc_Siemens.Write(PC_Request_Connection.Address, true);
            Console.WriteLine("PC Request to connect send...");

            Console.WriteLine("-----------------------------------------------------------------------------------");
            Console.WriteLine("Waiting for PLC Response... (Retrying every 500msec)");
            Console.WriteLine("-----------------------------------------------------------------------------------");


            do
            {
                if (PC_Connection_Lost && PLC_Response_Connection.Status == false) 
                    {
                        database.Record_PLC_ConnectionStatus(statusInformation.PC_Connection_Lost);
                        Console.WriteLine("**************************************************************");
                        Console.WriteLine("Event Recorded: " + statusInformation.PC_Connection_Lost);
                        PC_Connection_Lost = false;
                        statusInformation.Connection_Success_Recorded = false;

                }

                //Try to Connect
                if (PLC_Response_Connection.Status == false)
                {
                    EventWatch.Start();
                    PLC_Response_Connection.Status = (bool)Plc_Siemens.Read(PLC_Response_Connection.Address);

                    statusInformation.Plc_Connection_Error_Counter++;

                    Console.WriteLine("Retry Number: " + statusInformation.Plc_Connection_Error_Counter);

                    if (statusInformation.Plc_Connection_Error_Counter > 50)
                    {

                        database.Record_PLC_ConnectionStatus(statusInformation.Plc_Connection_Error);

                        Console.WriteLine("**************************************************************");
                        Console.WriteLine("Event Recorded: " + statusInformation.Plc_Connection_Error);

                        statusInformation.Plc_Connection_Error_Counter = 0;
                    }


                    if (EventWatch.ElapsedMilliseconds > 3000)
                    {
                        Console.WriteLine("----------------------------------------------------------------------------------");
                        Console.WriteLine("Waiting for PLC Response... (Retrying every 500msec)");
                        Console.WriteLine("----------------------------------------------------------------------------------");

                        EventWatch.Stop();
                        EventWatch.Reset();
                    }
                    //delay on PLC Retrial to Connect
                    Thread.Sleep(500);

                }
                else if (PLC_Response_Connection.Status == true)
                // Connection Established
                {

                    //Varible to know that the script left the second condition 
                    PC_Connection_Lost = true;
                    PLC_Response_Connection.Status = (bool)Plc_Siemens.Read(PLC_Response_Connection.Address);

                    if (statusInformation.Connection_Success_Recorded == false)
                    {
                        statusInformation.Plc_Connection_Error_Counter = 0;
                        EventWatch.Stop();
                        EventWatch.Reset();

                        database.Record_PLC_ConnectionStatus(statusInformation.Plc_Connection_Success);
                        Console.WriteLine("**************************************************************");
                        Console.WriteLine("Event Recorded: " + statusInformation.Plc_Connection_Success);
                        statusInformation.Connection_Success_Recorded = true;

                        Plc_Siemens.Write(PC_Busy.Address, false);
                        Plc_Siemens.Write(PC_Ready.Address, true);

                    }

                    EventWatch.Start();
                    if (EventWatch.ElapsedMilliseconds > 1000)
                    {
                        Console.WriteLine("Connected and Waiting..");
                        Console.WriteLine("----------------------------------------------------------------------------------");

                        EventWatch.Stop();
                        EventWatch.Reset();
                    }

                    // Set Communication Bit. This bit is used to diagnose error on communication
                    // on PLC Side by toggling the status of the variable. If PLC do not receive
                    // the bit status as true for a specific amount of time, then PLC sets an comm
                    // error bit


                    CommunicationWatch.Start();
                    

                    if (CommunicationWatch.ElapsedMilliseconds > 5000)
                    {
                    

                        CommunicationWatch.Stop();
                        CommunicationWatch.Reset();
                        Plc_Siemens.Write(TestConnection.Address, !TestConnection.Status);
                        TestConnection.Status = !TestConnection.Status;
                    }

                } 
            } while (true);
        }
    }
}