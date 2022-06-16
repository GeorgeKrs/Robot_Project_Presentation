using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using S7.Net;
using S7.Net.Types;

namespace Siemens_PLC_Handshake.Classes
{
        public struct Bit_Info
        {
            private string address;
            private bool status;


            public Bit_Info(string address, bool status)
            {
                this.address = address;
                this.status = status;
            }


            public string Address
            {
                get
                {
                    return address;
                }
                set
                {
                    address = value;
                }
            }

            public bool Status
            {
                get
                {
                    return status;
                }
                set
                {
                    status = value;
                }
            }

           
        }

}
