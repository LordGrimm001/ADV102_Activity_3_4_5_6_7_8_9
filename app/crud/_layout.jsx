import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="crud"
          options={{
            headerShown: false,
            title: "crud",
            headerTitle: "CRUD",
          }}
        />
      </Stack>
    </>
  );
}