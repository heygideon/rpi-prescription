import { SafeArea } from "@capacitor-community/safe-area";
import { App } from "@capacitor/app";

SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: "#00000000",
    statusBarContent: "dark",
    navigationBarColor: "#00000000",
    navigationBarContent: "dark",
  },
});
App.addListener("backButton", ({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    App.exitApp();
  }
});
