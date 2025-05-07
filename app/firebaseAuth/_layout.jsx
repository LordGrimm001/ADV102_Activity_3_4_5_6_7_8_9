import React from 'react';
import { Stack } from 'expo-router';

export default function FirebaseAuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Firebase Authentication",
          headerStyle: {
            backgroundColor: '#FF9800',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: "Firebase Login",
          headerStyle: {
            backgroundColor: '#FF9800',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: "Firebase Registration",
          headerStyle: {
            backgroundColor: '#FF9800',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "User Profile",
          headerStyle: {
            backgroundColor: '#FF9800',
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