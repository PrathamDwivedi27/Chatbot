import React, { createContext, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User{
    id:string;
    name:string;
    email:string;
}

// first step create context type
interface AuthContextType{
    user : User | null;         // value1
    isAuthenticated: boolean;       // value2
    login: (email: string, password: string) => Promise<void>; // do some action
    register: (name: string, email: string, password: string) => Promise<void>; // do some action
    logout: () => Promise<void>; // do some action
}

// step-2 create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// step-3 create custom hook to useContext
export const useAuth = ()=>{
    const context=useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// step-4 create AuthProvider component

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with real authentication
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };

    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration - replace with real authentication
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
    };

    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('chats');
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider