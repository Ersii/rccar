import hcsr04, time, piconzero as pz
import sys
import tty
import termios
import eventlet
eventlet.monkey_patch()
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abcd123'
socketio = SocketIO(app, async_mode='eventlet')

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=9000)
    
@socketio.on('connect')
def onSocketConnected():
    global connectedSockets
    print('socket was connected')
    socketio.emit('connection_successful')
    connectedSockets = connectedSockets + 1
    
    

def readchar():
    fd = sys.stdin.fileno()
    old_settings = termios.tcgetattr(fd)
    try:
        tty.setraw(sys.stdin.fileno())
        ch = sys.stdin.read(1)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
    if ch == '0x03':
        raise KeyboardInterrupt
    return ch

def readkey(getchar_fn=None):
    getchar = getchar_fn or readchar
    c1 = getchar()
    if ord(c1) != 0x1b:
        return c1
    c2 = getchar()
    if ord(c2) != 0x5b:
        return c1
    c3 = getchar()
    return chr(0x10 + ord(c3) - 65)  # 16=Up, 17=Down, 18=Right, 19=Left arrows

speed = 30
pan = 0
tilt = 1
grip = 2

hcsr04.init()
pz.init()

pz.setInputConfig(0, 0) 

# Set output mode to Servo
pz.setOutputConfig(pan, 2)
pz.setOutputConfig(tilt, 2)
pz.setOutputConfig(grip, 2)

# Centre all servos
panVal = 90
tiltVal = 90
gripVal = 90
pz.setOutput (pan, panVal)
pz.setOutput (tilt, tiltVal)
pz.setOutput (grip, gripVal)

# main loop
try:
    
    while True:
        for i in range(3):
            IRinput = pz.readInput(i) 
            if (IRinput == 0):
                print ("IR input", i, " is LOW")  
            else:         
                print ("IR input", i, " is HIGH") 
        distance = int(hcsr04.getDistance())
        print ("Distance:", distance, " cm")
        time.sleep(1)
        
        keyp = readkey()
        if keyp == 'o' or ord(keyp) == 16:
            panVal = max (0, panVal - 5)
            print ('Up', panVal)
        elif keyp == 'p' or ord(keyp) == 17:
            panVal = min (180, panVal + 5)
            print ('Down', panVal)
        elif keyp == 'w' or ord(keyp) == 16:
            pz.forward(speed)
            print ('Forward', speed)
        elif keyp == 'z' or ord(keyp) == 17:
            pz.reverse(speed)
            print ('Reverse', speed)
        elif keyp == '.' or keyp == '>':
            speed = min(100, speed+10)
            print ('Speed+', speed)
        elif keyp == ',' or keyp == '<':
            speed = max (0, speed-10)
            print ('Speed-', speed)
        elif keyp == ' ':
            pz.stop()
            print ('Stop')
        elif ord(keyp) == 3:
            break
        pz.setOutput (pan, panVal)
        pz.setOutput (tilt, tiltVal)
        pz.setOutput (grip, gripVal)
        
        def sendData():
            global speed, panVal, cruiseControl, laneAssist, distance
            strData = str(speed) + "s" + str(panVal) + "w" + str(cruiseControl) + "c" + str(laneAssist) + "l" + str(distance) + "d"
            socketio.emit('data',strData)
 
except KeyboardInterrupt:
    print

finally:
    pz.cleanup()
    hcsr04.cleanup()
