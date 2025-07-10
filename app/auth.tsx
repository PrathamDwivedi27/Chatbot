import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function AuthScreen() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.innerContainer}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <Ionicons name="chatbubble-ellipses" size={32} color="#000" />
              </View>
              <Text style={styles.title}>
                {isLogin ? 'Welcome Back' : 'Join Grok'}
              </Text>
              <Text style={styles.subtitle}>
                {isLogin
                  ? 'Sign in to continue your AI conversations'
                  : 'Create your account to get started'}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor="#666"
                    style={styles.input}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#666"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  style={styles.input}
                  secureTextEntry
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleAuth}
                disabled={isLoading}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {isLoading
                    ? 'Please wait...'
                    : isLogin
                    ? 'Sign In'
                    : 'Create Account'}
                </Text>
              </TouchableOpacity>

              {/* Toggle Mode */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <TouchableOpacity onPress={toggleMode}>
                  <Text style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  toggleText: {
    color: '#aaa',
    fontSize: 16,
  },
  toggleLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
});
