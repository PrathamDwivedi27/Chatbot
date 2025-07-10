import { useEffect } from 'react';
import { Stack } from 'expo-router';
// import { AuthProvider } from '../src/contexts/AuthContext';
// import { initializeFirebase } from '../src/services/firebase';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initialize Firebase
// initializeFirebase();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after initialization
    SplashScreen.hideAsync();
  }, []);

  return (
    // <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    // {/* </AuthProvider> */}
  );
}