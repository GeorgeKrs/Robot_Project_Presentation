import threading
import os
import time


def server():
    server_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Web_Application\server"
    os.chdir(server_path)
    os.system("node index.js")
    time.sleep(3)

def client():
    client_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Web_Application\client"
    os.chdir(client_path)
    # os.system("npm start")
    os.system("serve -s build")
    time.sleep(3)

def handshake(): 
    handshake_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Siemens_PLC_Handshake\Siemens_PLC_Handshake\bin\Release\net5.0"
    os.chdir(handshake_path)
    os.system("Siemens_PLC_Handshake.exe")
    time.sleep(3)




def main():
    server_thread = threading.Thread(target=server)
    server_thread.start()
    client_thread = threading.Thread(target=client)
    client_thread.start()
    handshake_thread = threading.Thread(target=handshake)
    handshake_thread.start()


main()