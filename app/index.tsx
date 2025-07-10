import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)/home');
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isAuthenticated]);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const features = [
    'Powered by advanced AI technology',
    'Natural conversation experience',
    'Creative problem solving',
    'Secure and private chats',
  ];

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#000000']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons name="chatbubble-ellipses" size={40} color="#000" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Welcome to Grok</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Your AI companion for intelligent conversations and creative thinking
          </Text>

          {/* Features */}
          <View style={styles.featuresWrapper}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.featureItem,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateX: slideAnim }],
                  },
                ]}
              >
                <View style={styles.bulletDot} />
                <Text style={styles.featureText}>{feature}</Text>
              </Animated.View>
            ))}
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleGetStarted}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.terms}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animatedView: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    backgroundColor: '#ffffff',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  featuresWrapper: {
    width: '100%',
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 16,
  },
  featureText: {
    color: '#cccccc',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  terms: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 20,
  },
});
