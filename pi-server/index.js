// @ts-check

import Bleno from "bleno";
import chalk from "chalk";
import { exec } from "child_process";
import { resolve } from "path";

const pyPath = resolve(import.meta.dirname, "locker.py");

const API_URL = "https://rpi-prescription-api.netlify.app";
const DEVICE_NAME = "Prescription";

// Regex for matching "id:123;code:abc"
const codeRegex = /^id:(?<id>[0-9]+);code:(?<code>\w+)$/;

/**
 * Collection: Verifies the id and code with the server
 * @param {Object} arg
 * @param {string} arg.id
 * @param {string} arg.code
 */
async function verifyCode({ id, code }) {
  const res = await fetch(`${API_URL}/locker-api/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, code }),
  });
  if (!res.ok) {
    throw new Error("Invalid id/code");
  }

  /**
   * @type {{ success: true, id: number, collectedAt: string, lockerNo: string }}
   */
  const data = await res.json();
  return data;
}

// Regex for matching "l:A1;code:abc"
const adminCodeRegex =
  /^id:(?<id>[0-9]+);l:(?<locker>[A-Z]\d+);code:(?<code>\w+)$/;

/**
 * Admin: Verifies the code and id with the server
 * @param {Object} arg
 * @param {string} arg.id
 * @param {string} arg.locker
 * @param {string} arg.code
 */
async function verifyAdminCode({ id, code, locker }) {
  const res = await fetch(`${API_URL}/locker-api/verify-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, code, locker }),
  });
  if (!res.ok) {
    throw new Error("Invalid id/code");
  }

  /**
   * @type {{ success: true, id: number, collectedAt: string, lockerNo: string }}
   */
  const data = await res.json();
  return data;
}

const prescriptionService = new Bleno.PrimaryService({
  uuid: "A07498CA-AD5B-474E-940D-16F1FBE7E8CD",
  characteristics: [
    // Collection
    new Bleno.Characteristic({
      uuid: "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B",
      properties: ["read", "write"],
      // secure: ["read", "write"],
      onWriteRequest: async (data, _offset, _withoutResponse, callback) => {
        const dataString = data.toString("utf-8");
        const match = dataString.match(codeRegex);

        console.log(chalk.yellow.bold("ᛒ Received data: " + dataString));

        if (!match || !match.groups) {
          console.log(chalk.gray(` | data: ${dataString}`));
          console.log(chalk.red.bold("x Incorrect data"));
          console.log("");

          callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
          return;
        }

        const { id, code } = match.groups;
        console.log(chalk.gray(` | id: ${id}`));
        console.log(chalk.gray(` | code: ${code}`));

        try {
          const verifyStart = performance.now();
          const { lockerNo, collectedAt } = await verifyCode({ id, code });
          console.log(
            chalk.green(" ✓ valid! ") +
              chalk.gray.italic(
                `(${(performance.now() - verifyStart).toFixed(2)}ms)`
              )
          );
          console.log(chalk.gray(` | locker no: ${lockerNo}`));
          console.log(
            chalk.gray(
              ` | collected at: ${new Date(collectedAt).toLocaleString()}`
            )
          );
          console.log("");

          callback(Bleno.Characteristic.RESULT_SUCCESS);

          console.log("opening locker...");
          exec(`python3 ${pyPath} ${lockerNo}`, (err, stdout) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
          });
        } catch (e) {
          console.log(chalk.red.bold("x Invalid id/code"));
          console.log("");
          console.error(e);
          console.log("");

          callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
      },
    }),

    // Admin
    new Bleno.Characteristic({
      uuid: "478264A7-AF0A-4E22-A666-CC8E8B065FF1",
      properties: ["read", "write"],
      // secure: ["read", "write"],
      onWriteRequest: async (data, _offset, _withoutResponse, callback) => {
        const dataString = data.toString("utf-8");
        const match = dataString.match(adminCodeRegex);

        console.log(
          chalk.yellow.bold("ᛒ (Admin): Received data: " + dataString)
        );

        if (!match || !match.groups) {
          console.log(chalk.gray(` | data: ${dataString}`));
          console.log(chalk.red.bold("x Incorrect data"));
          console.log("");

          callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
          return;
        }

        const { id, code, locker } = match.groups;
        console.log(chalk.gray(` | id: ${id}`));
        console.log(chalk.gray(` | code: ${code}`));
        console.log(chalk.gray(` | locker: ${locker}`));

        try {
          const verifyStart = performance.now();
          const { lockerNo } = await verifyAdminCode({
            id,
            code,
            locker,
          });
          console.log(
            chalk.green(" ✓ valid! ") +
              chalk.gray.italic(
                `(${(performance.now() - verifyStart).toFixed(2)}ms)`
              )
          );
          console.log(chalk.gray(` | locker no: ${lockerNo}`));
          console.log("");

          callback(Bleno.Characteristic.RESULT_SUCCESS);

          console.log("opening locker...");
          exec(`python3 ${pyPath} ${lockerNo}`, (err, stdout) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(stdout);
          });
        } catch (e) {
          console.log(chalk.red.bold("x Invalid id/code"));
          console.log("");
          console.error(e);
          console.log("");

          callback(Bleno.Characteristic.RESULT_UNLIKELY_ERROR);
        }
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
