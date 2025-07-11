import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { startNewChat, recentChats } = useChat();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNewChat = () => {
    startNewChat();
    router.push("/(tabs)/chat");
  };

  const handleContinueChat = (chatId: string) => {
    router.push("/(tabs)/chat");
  };

  const suggestions = [
    "Explain quantum computing",
    "Write a creative story",
    "Help with coding",
    "Plan a trip",
    "Solve math problems",
    "Brainstorm ideas",
  ];

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || "User"}</Text>
            <Text style={styles.subGreeting}>
              What can I help you with today?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              logout();
              router.replace("/");
            }}
            style={styles.logoutButton}
          >
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* New Chat Button */}
          <View style={styles.section}>
            <TouchableOpacity
              onPress={handleNewChat}
              style={styles.newChatButton}
              activeOpacity={0.8}
            >
              <View style={styles.newChatContent}>
                <Ionicons name="add-circle" size={24} color="#000000" />
                <Text style={styles.newChatText}>Start New Chat</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Suggestions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Try asking about...</Text>
            <View style={styles.suggestionsContainer}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    startNewChat();
                    router.push({
                      pathname: "/(tabs)/chat",
                      params: { initialMessage: suggestion },
                    });
                  }}
                  style={styles.suggestionButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Chats */}
          {recentChats.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Chats</Text>
              {recentChats.slice(0, 5).map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  onPress={() => handleContinueChat(chat.id)}
                  style={styles.chatCard}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chatTitle} numberOfLines={1}>
                    {chat.title || "Untitled Chat"}
                  </Text>
                  <Text style={styles.chatMessage} numberOfLines={2}>
                    {chat.lastMessage}
                  </Text>
                  <Text style={styles.chatDate}>
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  greeting: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subGreeting: {
    color: "#aaaaaa",
    fontSize: 16,
    marginTop: 4,
  },
  logoutButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2d2d2d",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  newChatButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  newChatContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newChatText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionButton: {
    backgroundColor: "#2d2d2d",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 12,
  },
  suggestionText: {
    color: "#cccccc",
    fontSize: 14,
  },
  chatCard: {
    backgroundColor: "#111111",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2e2e2e",
  },
  chatTitle: {
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 4,
  },
  chatMessage: {
    color: "#bbbbbb",
    fontSize: 14,
  },
  chatDate: {
    color: "#777777",
    fontSize: 12,
    marginTop: 8,
  },
});
