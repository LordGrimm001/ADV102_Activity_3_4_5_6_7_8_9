import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="StopwatchScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
