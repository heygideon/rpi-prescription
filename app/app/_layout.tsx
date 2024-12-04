import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="order/[id]/index" />
      <Stack.Screen
        name="order/[id]/collect"
        options={{ presentation: "modal", gestureEnabled: true }}
      />
    </Stack>
  );
}
