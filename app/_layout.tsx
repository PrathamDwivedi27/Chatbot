import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import AuthProvider from '../contexts/AuthContext';
import { ChatProvider } from '../contexts/ChatContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ChatProvider>
          <View style={{ flex: 1, backgroundColor: 'black', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
            <StatusBar style="light" translucent />
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
          </View>
        </ChatProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
