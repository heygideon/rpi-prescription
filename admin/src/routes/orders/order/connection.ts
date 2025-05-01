// copied from /app/src/routes/prescription/connection.ts

import {
  BleClient,
  type BleDevice,
  type RequestBleDeviceOptions,
} from "@capacitor-community/bluetooth-le";
import { useEffect, useMemo, useState } from "react";

// Stub for Capacitor
const Capacitor = {
  getPlatform: () => "web",
};

export type SignalStrength = "excellent" | "good" | "fair" | "poor" | "unknown";
export type LockerConnection = ReturnType<typeof useLockerConnection>;

export default function useLockerConnection(
  opts: RequestBleDeviceOptions = {},
) {
  const [device, setDevice] = useState<BleDevice | null>(null);
  const [rssi, setRssi] = useState<number | null>(null);
  const strength = useMemo((): SignalStrength => {
    if (rssi === null) return "unknown";
    if (rssi >= -50) return "excellent";
    if (rssi >= -70) return "good";
    if (rssi >= -90) return "fair";
    return "poor";
  }, [rssi]);

  useEffect(() => {
    let _device: BleDevice | null = null;

    const init = async ({ signal }: { signal: AbortSignal }) => {
      await BleClient.initialize();

      if (Capacitor.getPlatform() === "web") {
        // stop multiple popups (because of React StrictMode)
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (signal.aborted) return;

        // Cannot scan for devices on web
        const device = await BleClient.requestDevice(opts);
        await BleClient.connect(device.deviceId);

        if (signal.aborted) return;
        _device = device;
        setDevice(device);
        setRssi(null);
      } else {
        signal.addEventListener("abort", () => BleClient.stopLEScan());
        BleClient.requestLEScan(opts, async (result) => {
          await BleClient.stopLEScan();
          await BleClient.connect(result.device.deviceId);

          if (signal.aborted) return;
          _device = result.device;
          setDevice(result.device);
          setRssi(result.rssi ?? null);
        });
      }
    };

    const controller = new AbortController();
    init({ signal: controller.signal }).catch((e) => {
      if (e.name === "AbortError") return;
      console.error("Error connecting to locker", e);
    });
    return () => {
      controller.abort();
      if (_device) BleClient.disconnect(_device.deviceId);
    };
  }, []);

  // Subscribe to RSSI updates (signal strength)
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") return;
    if (!device) return;

    const interval = setInterval(async () => {
      if (!device) return;
      const rssi = await BleClient.readRssi(device.deviceId);
      setRssi(rssi);
    }, 3000);
    return () => clearInterval(interval);
  }, [device]);

  return {
    device,
    signal: {
      strength,
      rssi,
    },
  };
}
