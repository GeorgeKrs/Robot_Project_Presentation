import threading
import os

def server():
    server_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Web_Application\server"
    os.chdir(server_path)
    os.system("node index.js")

def client():
    client_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Web_Application\client"
    os.chdir(client_path)
    os.system("npm start")

def handshake(): 
    handshake_path = r"C:\Users\Provik\Desktop\Robot_Project_Presentation\Siemens_PLC_Handshake\Siemens_PLC_Handshake"
    # os.chdir(handshake_path)
    # os.system("Program.cs")



def main():
    server_thread = threading.Thread(target=server)
    server_thread.start()
    client_thread = threading.Thread(target=client)
    client_thread.start()
    # handshake_thread = threading.Thread(target=handshake)
    # handshake_thread.start()

main()