import React from 'react';
import { Stack } from 'expo-router';
import AuthProvider from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { StatusBar } from 'expo-status-bar';

// Optional: remove this if you're not using SplashScreen manually
// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
        </Stack>
        <StatusBar style="light" backgroundColor="#000000" />
      </ChatProvider>
    </AuthProvider>
  );
};

export default RootLayout;
