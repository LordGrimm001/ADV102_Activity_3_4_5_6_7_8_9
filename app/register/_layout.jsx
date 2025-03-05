import { Stack } from "expo-router";

export default function RegisterLayout() {
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}