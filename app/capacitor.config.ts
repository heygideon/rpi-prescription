import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.synapse",
  appName: "SuperCoolApp",
  webDir: "build/client",

  // for dev only
  android: {
    allowMixedContent: true,
  },
  server: {
    // url: "http://ubuntu:5173",
    cleartext: true,
  },
};

export default config;
