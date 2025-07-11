import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
}

interface ChatContextType {
  currentChat: Chat | null;
  recentChats: Chat[];
  startNewChat: () => void;
  addMessage: (text: string, isUser: boolean) => void;
  updateChatTitle: (title: string) => void;
  loadChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [recentChats, setRecentChats] = useState<Chat[]>([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
  try {
    const chatsData = await AsyncStorage.getItem('chats');
    const currentChatId = await AsyncStorage.getItem('currentChatId');

    if (chatsData) {
      const parsedChats: Chat[] = JSON.parse(chatsData).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));

      setRecentChats(parsedChats);

      if (currentChatId) {
        const current = parsedChats.find(chat => chat.id === currentChatId);
        if (current) setCurrentChat(current);
      }
    }
  } catch (error) {
    console.error('Error loading chats:', error);
  }
};


  const saveChats = async (chats: Chat[]) => {
    try {
      await AsyncStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats:', error);
    }
  };

  const startNewChat = async (): Promise<string> => {
  const newChat: Chat = {
    id: Date.now().toString(),
    title: 'New Chat',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    lastMessage: '',
  };

  setCurrentChat(newChat);

  const updatedChats = [newChat, ...recentChats].slice(0, 10);
  setRecentChats(updatedChats);

  await AsyncStorage.setItem('currentChatId', newChat.id);
  await saveChats(updatedChats);

  return newChat.id; // return ID so router can use it
};



  const addMessage = (text: string, isUser: boolean) => {
    if (!currentChat) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };

    const updatedChat: Chat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      updatedAt: new Date(),
      lastMessage: text,
    };

    setCurrentChat(updatedChat);

    // Update recent chats
    const updatedRecentChats = [
      updatedChat,
      ...recentChats.filter(chat => chat.id !== updatedChat.id),
    ].slice(0, 10); // Keep only 10 recent chats

    setRecentChats(updatedRecentChats);
    saveChats(updatedRecentChats);
  };

  const updateChatTitle = (title: string) => {
    if (!currentChat) return;

    const updatedChat: Chat = {
      ...currentChat,
      title,
    };

    setCurrentChat(updatedChat);

    const updatedRecentChats = recentChats.map(chat =>
      chat.id === updatedChat.id ? updatedChat : chat
    );

    setRecentChats(updatedRecentChats);
    saveChats(updatedRecentChats);
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        recentChats,
        startNewChat,
        addMessage,
        updateChatTitle,
        loadChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};