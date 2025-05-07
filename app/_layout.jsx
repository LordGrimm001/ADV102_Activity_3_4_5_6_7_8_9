import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './firebase/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="LoginForm" options={{ headerShown: true }} />
        <Stack.Screen name="RegisterForm" options={{ headerShown: true }} />
        <Stack.Screen name="firebaseAuth" options={{ headerShown: true }} />
      </Stack>
    </AuthProvider>
  );
}