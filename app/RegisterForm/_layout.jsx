import React from 'react';
import { Stack } from 'expo-router';

export default function RegisterFormLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Registration Form",
          headerStyle: {
            backgroundColor: '#28a745',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack>
  );
}