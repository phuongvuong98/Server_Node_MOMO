import os 
import sys
os.system('sudo apt install python3-pip')
os.system('python3 -m pip install {}'.format(sys.argv[1]))