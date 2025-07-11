import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useChat } from "../../contexts/ChatContext";
import { Ionicons } from "@expo/vector-icons";
import { GeminiService } from "../../services/GeminiService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const { chatId, initialMessage } = useLocalSearchParams();
  const { currentChat, addMessage, updateChatTitle,recentChats } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;


// This effect syncs messages only once when chatId or recentChats change
useEffect(() => {
  if (chatId && recentChats.length > 0) {
    const matched = recentChats.find((chat) => chat.id === chatId);
    if (matched) {
      setMessages([...matched.messages]); // clone to avoid mutation issues
    }
  }
}, [chatId, recentChats]);



  useEffect(() => {
    if (initialMessage && typeof initialMessage === "string") {
      handleSendMessage(initialMessage);
      setInputText("");
    }
  }, [initialMessage]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      addMessage(userMessage.text, true);
      const response = await GeminiService.generateResponse(text.trim());

      const aiMessageId = (Date.now() + 1).toString();
      let partialText = "";

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          text: "",
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      for (let i = 0; i < response.length; i++) {
        partialText += response[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: partialText } : msg
          )
        );
        await new Promise((res) => setTimeout(res, 10)); // simulate typing
      }

      addMessage(response, false);

      if (messages.length === 0) {
        updateChatTitle(text.trim().slice(0, 50));
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animated.View
      style={[
        { opacity: fadeAnim },
        item.isUser ? styles.messageRight : styles.messageLeft,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isUser ? styles.userText : styles.aiText,
          ]}
        >
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={["#000000", "#1a1a1a"]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // adjust for status bar/header if needed
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Grok Chat</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={64}
                color="#333333"
              />
              <Text style={styles.emptyText}>
                Start a conversation with Grok
              </Text>
              <Text style={styles.emptySubText}>
                Ask me anything - I&apos;m here to help with your questions and
                ideas
              </Text>
            </View>
          }
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#ffffff" />
            <Text style={styles.loadingText}>Grok is thinking...</Text>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message Grok..."
              placeholderTextColor="#666666"
              style={styles.input}
              multiline
              maxLength={1000}
              onSubmitEditing={() => handleSendMessage()}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              onPress={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              style={[
                styles.sendButton,
                inputText.trim() && !isLoading
                  ? styles.sendActive
                  : styles.sendDisabled,
              ]}
            >
              <Ionicons
                name="send"
                size={16}
                color={inputText.trim() && !isLoading ? "#000000" : "#666666"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#2e2e2e",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messageLeft: {
    alignItems: "flex-start",
    marginBottom: 16,
  },
  messageRight: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 16,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: "#ffffff",
  },
  aiBubble: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444444",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#000000",
  },
  aiText: {
    color: "#ffffff",
  },
  timestamp: {
    marginTop: 8,
    fontSize: 12,
    color: "#777777",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: "#aaaaaa",
    fontSize: 18,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubText: {
    color: "#777777",
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 32,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  loadingText: {
    color: "#bbbbbb",
    marginLeft: 8,
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderColor: "#2e2e2e",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 999,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    paddingVertical: 10,
  },
  sendButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sendActive: {
    backgroundColor: "#ffffff",
  },
  sendDisabled: {
    backgroundColor: "#444444",
  },
});