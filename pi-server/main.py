"""
Example for a BLE 4.0 Server
"""
import sys
import logging
import asyncio
import threading

import requests
import re

from typing import Any, Union

from bless import (  # type: ignore
    BlessServer,
    BlessGATTCharacteristic,
    GATTCharacteristicProperties,
    GATTAttributePermissions,
)

def parse_prescription_data(data: str):
    print("parse", data)
    match = re.search("^id:[0-9]+;code:\w+$", data)
    if match:
        parts = data.split(";")
        id_part = parts[0].split(":")[1]
        code_part = parts[1].split(":")[1]
        
        
        print("parse", id_part, code_part)
    
        return { "id": id_part, "code": code_part }
    else:
        print("parse", None)
        return None


def verify_prescription(id: str, code: str):
    data = { "id": id, "code": code }
    res = requests.post("https://rpi-prescription-api.netlify.app/locker-api/verify", json=data)
    return res.json()   

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(name=__name__)

# NOTE: Some systems require different synchronization methods.
trigger: Union[asyncio.Event, threading.Event]
if sys.platform in ["darwin", "win32"]:
    trigger = threading.Event()
else:
    trigger = asyncio.Event()


def read_request(characteristic: BlessGATTCharacteristic, **kwargs) -> bytearray:
    logger.debug(f"Reading {characteristic.value}")
    return characteristic.value


def write_request(characteristic: BlessGATTCharacteristic, value: Any, **kwargs):
    characteristic.value = value
    logger.debug(f"Char value set to {characteristic.value}")
    
    #try:
    data = parse_prescription_data(value.decode("utf-8"))
    print(verify_prescription(id=data["id"], code=data["code"]))
    trigger.set()
    #except:
        #print("nothing here")


async def run(loop):
    trigger.clear()
    # Instantiate the server
    my_service_name = "PrescriptionID"
    server = BlessServer(name=my_service_name, loop=loop)
    server.read_request_func = read_request
    server.write_request_func = write_request

    # Add Service
    my_service_uuid = "A07498CA-AD5B-474E-940D-16F1FBE7E8CD"
    await server.add_new_service(my_service_uuid)

    # Add a Characteristic to the service
    my_char_uuid = "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B"
    char_flags = (
        GATTCharacteristicProperties.read
        | GATTCharacteristicProperties.write
        | GATTCharacteristicProperties.indicate
    )
    permissions = GATTAttributePermissions.readable | GATTAttributePermissions.writeable
    await server.add_new_characteristic(
        my_service_uuid, my_char_uuid, char_flags, None, permissions
    )

    logger.debug(server.get_characteristic(my_char_uuid))
    await server.start()
    logger.debug("Advertising")
    logger.info(f"Write '0xF' to the advertised characteristic: {my_char_uuid}")
    if trigger.__module__ == "threading":
        trigger.wait()
    else:
        await trigger.wait()

    await asyncio.sleep(2)
    logger.debug("Updating")
    server.get_characteristic(my_char_uuid)
    server.update_value(my_service_uuid, "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B")
    await asyncio.sleep(5)
    await server.stop()


loop = asyncio.get_event_loop()
loop.run_until_complete(run(loop))

