import Bleno from "bleno";
import chalk from "chalk";
import { exec } from "child_process";

const DEVICE_NAME = "Prescription";

// Regex for matching "id:123;code:abc"
const codeRegex = /^id:(?<id>[0-9]+);code:(?<code>\w+)$/;

const prescriptionService = new Bleno.PrimaryService({
  uuid: "A07498CA-AD5B-474E-940D-16F1FBE7E8CD",
  characteristics: [
    new Bleno.Characteristic({
      uuid: "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B",
      properties: ["read", "write"],
      // secure: ["read", "write"],
      onWriteRequest: (data, offset, withoutResponse, callback) => {
        const dataString = data.toString("utf-8");
        const match = dataString.match(codeRegex);

        if (!match) {
          console.log("");
          console.log(chalk.red.bold("Incorrect data"));
          console.log(chalk.gray(` | data: ${dataString}`));
          console.log("");

          callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
          return;
        }

        const { id, code } = match.groups;

        fetch("https://rpi-prescription-api.netlify.app/locker-api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, code }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("");
            console.log(chalk.green.bold("Valid code"));
            console.log(chalk.gray(` | data: ${dataString}`));
            console.log(chalk.gray(` | response: ${JSON.stringify(data)}`));
            console.log("");

            callback(Bleno.Characteristic.RESULT_SUCCESS);

            exec("python3 locker.py", (err, stdout) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          })
          .catch((error) => {
            console.log("");
            console.log(chalk.red.bold("Invalid id/code"));
            console.log(chalk.gray(` | data: ${dataString}`));
            console.log(chalk.gray(` | error: ${error}`));
            console.log("");

            callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
          });
      },
    }),
  ],
});
Bleno.setServices([prescriptionService]);

Bleno.on("stateChange", (state) => {
  if (state === "poweredOn") {
    Bleno.startAdvertising(DEVICE_NAME, [prescriptionService.uuid]);
    console.log("");
    console.log(chalk.cyan.bold("ᛒ Bluetooth on") + ` (${DEVICE_NAME})`);
    console.log("");
  } else {
    Bleno.stopAdvertising();
    console.log("");
    console.log(chalk.magenta.bold("ᛒ Bluetooth off"));
    console.log("");
  }
});

Bleno.on("accept", (clientAddress) => {
  console.log(chalk.gray("connect: ", clientAddress));
});
Bleno.on("disconnect", (clientAddress) => {
  console.log(chalk.gray("disconnect: ", clientAddress));
});
