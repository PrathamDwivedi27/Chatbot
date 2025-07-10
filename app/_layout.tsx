import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import AuthProvider from '@/contexts/AuthContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  })

  useEffect(()=>{
    if(loaded){
      SplashScreen.hideAsync();
    }
  },[loaded]);

  if(!loaded){
    return null;
  }
  return (
    <AuthProvider>
      <ChatProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0000000' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="auth"/>

        </Stack>
        <StatusBar style="light" backgroundColor="#0000000" />
      </ChatProvider>
    </AuthProvider>
  )
}

export default RootLayout