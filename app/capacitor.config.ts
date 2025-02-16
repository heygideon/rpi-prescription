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
    cleartext: true,
  },

  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: "#00000000",
      statusBarContent: "dark",
      navigationBarColor: "#00000000",
      navigationBarContent: "dark",
      offset: 0,
    },
  },
};

export default config;
