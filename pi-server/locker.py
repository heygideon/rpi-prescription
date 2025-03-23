# called by index.js
import sys
import RPi.GPIO as GPIO
from time import sleep

locker_no = sys.argv[1]

print(f"This is where locker {locker_no} would be opened")

lockers = {
    "A1": 18,
    "A2": 12,
    "A3": 17
    }

GPIO.setmode(GPIO.BCM)

for pin in lockers.values():
    GPIO.setup(pin, GPIO.OUT)
    
def unlock_solenoid(locker_num):
    GPIO.output(lockers[locker_num], 1)
    sleep(5)
    GPIO.output(lockers[locker_num], 0)


def lock_solenoid(locker_num):
    GPIO.output(lockers[locker_num], 0)
  
    
def cleanup():
    GPIO.cleanup()

unlock_solenoid(locker_no)
