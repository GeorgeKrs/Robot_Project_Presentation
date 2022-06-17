using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Siemens_PLC_Handshake.Classes
{
    public class Status_Information
    {
        public string Plc_Connection_Success { get;  } = "Connection between the PC and the PLC established.";
        public string Plc_Connection_Error { get;  } = "Unable to establish connection to the PLC.";
        public string PC_Connection_Lost { get; } = "PC lost the connection to the PLC. Waiting for PLC response to connect again.";
        public int Plc_Connection_Error_Counter { set; get; } = 0;
        public bool Connection_Success_Recorded { set; get; } = false;
        public string Database_WriteData_Error { get; } = "PC was unable to write data to database.";
    }
}
