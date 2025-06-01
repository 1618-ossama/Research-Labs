"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useWebSocket } from "@/hooks/use-websocket";
import ConversationList from "./conversation-list";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import UserIdInput from "./useridinput";
import type {
  Conversation,
  Message,
  User,
  S2CWebSocketMessage,
  EditMessagePayload,
  DeleteMessagePayload,
  PresencePayload,
  TypingPayload,
  MessageSentPayload,
} from "@/lib/chat";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Users,
  WifiOff,
  MessageCircle,
  AlertCircle
} from "lucide-react";

interface ChatInterfaceProps {
  initialUser?: Partial<User>;
  apiConfig?: {
    baseUrl?: string;
    wsUrl?: string;
  };
}

interface LoadingStates {
  messages: boolean;
  conversations: boolean;
}

const DEFAULT_USER: User = {
  id: "demo-user-001",
  username: "_user",
  email: "demo@example.com",
  password_hash: "demo-hash",
  first_name: "",
  last_name: "User",
  role: "GUEST",
  status: "online",
  created_at: new Date(),
  updated_at: new Date(),
};

const DEFAULT_API_CONFIG = {
  baseUrl: "http://127.0.0.1:3007",
  wsUrl: "ws://127.0.0.1:3007/",
};

const MAX_MESSAGE_LENGTH = 4000;
const TYPING_TIMEOUT = 3000;
const MAX_RETRIES = 3;

const SkeletonLoader = ({ type }: { type: 'conversation' | 'message' }) => {
  if (type === 'conversation') {
    return (
      <div className="px-4 py-3 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-16 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
};

const ConnectionStatus = ({
  connected,
  reconnectAttempts
}: {
  connected: boolean;
  reconnectAttempts: number;
}) => {
  if (connected) {
    return (
      <div className="flex items-center text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
        <span className="text-xs">Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-orange-600">
      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
      <span className="text-xs">
        Reconnecting... {reconnectAttempts > 0 && `(${reconnectAttempts}/5)`}
      </span>
    </div>
  );
};

const ErrorBoundary = ({
  error,
  onRetry
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
      <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-4">{error}</p>
      <Button onClick={onRetry} className="w-full">
        Try Again
      </Button>
    </div>
  </div>
);

const EmptyState = ({
  type,
  title,
  description
}: {
  type: 'auth' | 'conversations' | 'select';
  title: string;
  description: string;
}) => {
  const icons = {
    auth: WifiOff,
    conversations: Users,
    select: MessageCircle,
  };

  const Icon = icons[type];

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
        <Icon className="h-16 w-16 mx-auto mb-4 text-red-400" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-500 mb-4">{description}</p>
        {type === 'auth' && (
          <Button onClick={() => window.location.reload()} className="w-full">
            Refresh Page
          </Button>
        )}
      </div>
    </div>
  );
};

const getAuthToken = (): string | null => {
  try {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('AccessTokenCookie='))
      ?.split('=')[1];

    let localStorageToken = null;
    let sessionStorageToken = null;

    try {
      localStorageToken = localStorage?.getItem('AccessTokenCookie');
      sessionStorageToken = sessionStorage?.getItem('AccessTokenCookie');
    } catch (e) {
      console.warn('Storage access failed:', e);
    }

    return cookieToken || localStorageToken || sessionStorageToken;
  } catch (error) {
    console.error('Token fetch error:', error);
    return null;
  }
};

const getUserDisplayInfo = (user: User) => {
  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`.trim()
    : user.username || 'User';

  const initials = user.first_name && user.last_name
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
    : user.username?.charAt(0)?.toUpperCase() || 'U';

  return { displayName, initials };
};

export default function ChatInterface({ initialUser, apiConfig }: ChatInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    messages: false,
    conversations: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [typingTimeouts, setTypingTimeouts] = useState<Map<string, NodeJS.Timeout>>(new Map());
  const [token, setToken] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const user = useMemo(() => ({ ...DEFAULT_USER, ...initialUser }), [initialUser]);
  const { baseUrl, wsUrl } = useMemo(() => ({
    ...DEFAULT_API_CONFIG,
    ...apiConfig,
  }), [apiConfig]);
  const { displayName, initials } = useMemo(() => getUserDisplayInfo(user), [user]);
  const sortedMessages = useMemo(() =>
    [...messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    [messages]
  );

  const { toast } = useToast();

  const updateConversationWithNewMessage = useCallback((message: Message, incrementUnread: boolean) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === message.conversation_id
          ? {
            ...conv,
            last_message: message.message,
            updated_at: message.created_at,
            unread_count: (conv.id !== currentConversation?.id && incrementUnread)
              ? (conv.unread_count || 0) + 1
              : conv.unread_count,
          }
          : conv
      ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    );
  }, [currentConversation?.id]);

  const getDirectMessageUserId = (conversation: Conversation) => {
    if (conversation.conversation_type !== "DIRECT") return null;
    const otherParticipant = conversation.participants?.find(p => p.user_id !== user.id);
    return otherParticipant?.user_id || null;
  };

  const handleNewMessage = useCallback((message: Message) => {
    console.log('Received new message:', message);

    updateConversationWithNewMessage(message, message.sender_id !== user.id);

    if (message.conversation_id === currentConversation?.id) {
      setMessages(prev => {
        const pendingMatch = prev.find(m =>
          m.pending &&
          m.message === message.message &&
          m.sender_id === message.sender_id &&
          Math.abs(new Date(m.created_at).getTime() - new Date(message.created_at).getTime()) < 5000
        );

        if (pendingMatch) {
          return prev.map(m =>
            m.id === pendingMatch.id ? { ...message, pending: false } : m
          );
        }

        if (!prev.some(m => m.id === message.id)) {
          return [...prev, message];
        }

        return prev;
      });
    }
  }, [currentConversation?.id, user.id, updateConversationWithNewMessage]);

  const handleMessageSent = useCallback((payload: MessageSentPayload) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === payload.tempId
          ? { ...payload.message, pending: false, status: "SENT", id: payload.message.id }
          : msg
      )
    );

    updateConversationWithNewMessage(payload.message, false);
    toast({
      title: "Message delivered",
      description: "Your message has been received by the server",
    });
  }, [updateConversationWithNewMessage, toast]);

  const handleMessageEdit = useCallback((payload: EditMessagePayload) => {
    if (payload.conversationId === currentConversation?.id) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === payload.messageId
            ? { ...msg, message: payload.newText, updated_at: new Date() }
            : msg
        )
      );
    }
  }, [currentConversation?.id]);

  const handleMessageDelete = useCallback((payload: DeleteMessagePayload) => {
    if (payload.conversationId === currentConversation?.id) {
      setMessages(prev => prev.filter(msg => msg.id !== payload.messageId));
    }
  }, [currentConversation?.id]);

  const handleTypingIndicator = useCallback((payload: TypingPayload) => {
    if (payload.conversationId !== currentConversation?.id || payload.userId === user.id) return;

    const userName = payload.userName || `User ${payload.userId.slice(0, 4)}`;
    const existingTimeout = typingTimeouts.get(userName);

    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    setTypingUsers(prev => {
      const newSet = new Set(prev);
      if (payload.isTyping) {
        newSet.add(userName);
      } else {
        newSet.delete(userName);
      }
      return newSet;
    });

    if (payload.isTyping) {
      const timeout = setTimeout(() => {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userName);
          return newSet;
        });
        setTypingTimeouts(prev => {
          const newMap = new Map(prev);
          newMap.delete(userName);
          return newMap;
        });
      }, TYPING_TIMEOUT);

      setTypingTimeouts(prev => {
        const newMap = new Map(prev);
        newMap.set(userName, timeout);
        return newMap;
      });
    } else {
      setTypingTimeouts(prev => {
        const newMap = new Map(prev);
        newMap.delete(userName);
        return newMap;
      });
    }
  }, [currentConversation?.id, user.id, typingTimeouts]);

  const handlePresenceUpdate = useCallback((payload: PresencePayload) => {
    setConversations(prev => prev.map(conv => {
      if (conv.participants?.some(p => p.user_id === payload.userId)) {
        return {
          ...conv,
          participants: conv.participants?.map(p =>
            p.user_id === payload.userId
              ? { ...p, status: payload.status }
              : p
          ) || []
        };
      }
      return conv;
    }));
  }, []);

  const handleWebSocketMessage = useCallback((message: S2CWebSocketMessage) => {
    console.log('WebSocket message received:', message.type, message);

    try {
      const handlers = {
        "chat:new_message": () => handleNewMessage(message.payload),
        "chat:message_sent": () => handleMessageSent(message.payload),
        "chat:edit_message": () => handleMessageEdit(message.payload),
        "chat:delete_message": () => handleMessageDelete(message.payload),
        "typing": () => handleTypingIndicator(message.payload),
        "presence": () => handlePresenceUpdate(message.payload),
        "pong": () => console.debug("Received pong"),
      };

      const handler = handlers[message.type as keyof typeof handlers];
      if (handler) {
        handler();
      } else {
        console.debug("Unhandled message type:", message.type);
      }
    } catch (error) {
      console.error("Error handling WebSocket message:", error);
    }
  }, [handleNewMessage, handleMessageSent, handleMessageEdit, handleMessageDelete, handleTypingIndicator, handlePresenceUpdate]);

  const handleConnect = useCallback(() => {
    setError(null);
    setRetryCount(0);
    toast({ title: "Connected", description: "Real-time chat is active" });
    if (user.id) {
      sendPresenceUpdate?.('online', user.id);
    }
  }, [toast, user.id]);

  const handleDisconnect = useCallback((event: CloseEvent) => {
    const isNormalClosure = event.code === 1000;
    if (!isNormalClosure) {
      toast({
        title: "Disconnected",
        description: event.reason || "Chat connection lost",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleWebSocketError = useCallback((error: Event) => {
    setError("Connection error. Please check your network connection.");
    console.error("WebSocket error:", error);
  }, []);

  const {
    connected,
    sendMessage,
    sendTypingNotification,
    sendPresenceUpdate,
    sendChatMessage,
    connect,
    disconnect,
    reconnectAttempts,
  } = useWebSocket({
    url: wsUrl,
    token,
    onMessage: handleWebSocketMessage,
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
    onError: handleWebSocketError,
    autoConnect: false,
  });

  const fetchConversations = useCallback(async () => {
    if (!token) return;

    setLoadingStates(prev => ({ ...prev, conversations: true }));
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/chat/conversations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Failed to fetch conversations: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error('Invalid response format from server');
      }

      const conversations = result.data.map((conv: any) => ({
        ...conv,
        created_at: new Date(conv.created_at),
        updated_at: new Date(conv.updated_at),
        participants: conv.participants?.map((p: any) => ({
          ...p,
          created_at: new Date(p.created_at)
        })) || []
      }));

      setConversations(conversations);

      if (conversations.length > 0 && !currentConversation) {
        setCurrentConversation(conversations[0]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load conversations';
      setError(errorMessage);
      console.error('Error fetching conversations:', err);
    } finally {
      setLoadingStates(prev => ({ ...prev, conversations: false }));
    }
  }, [token, baseUrl, currentConversation]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!token) return;

    setLoadingStates(prev => ({ ...prev, messages: true }));
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/api/chat/conversations/${conversationId}/messages`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.data || !Array.isArray(result.data)) {
        throw new Error('Invalid response format from server');
      }

      const messages = result.data.map((msg: any) => ({
        ...msg,
        created_at: new Date(msg.created_at),
        updated_at: msg.updated_at ? new Date(msg.updated_at) : undefined,
      }));

      setMessages(messages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load messages';
      setError(errorMessage);
      console.error('Error fetching messages:', err);
    } finally {
      setLoadingStates(prev => ({ ...prev, messages: false }));
    }
  }, [token, baseUrl]);

  const markConversationAsRead = useCallback(async (conversationId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${baseUrl}/api/chat/conversations/${conversationId}/read`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });

      if (response.ok) {
        setConversations(prev =>
          prev.map(conv =>
            conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
          )
        );
      }
    } catch (error) {
      console.error('Failed to mark conversation as read:', error);
    }
  }, [token, baseUrl]);

  const handleSendMessage = useCallback((text: string) => {
    if (!currentConversation?.id || !text.trim() || !connected || !user.id) {
      toast({
        title: "Cannot send message",
        description: !connected ? "Not connected to chat server" :
          !currentConversation ? "No conversation selected" :
            !text.trim() ? "Message cannot be empty" : "Invalid user",
        variant: "destructive",
      });
      return;
    }

    const sanitizedText = text.trim().substring(0, MAX_MESSAGE_LENGTH);
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const optimisticMessage: Message = {
      id: tempId,
      message: sanitizedText,
      conversation_id: currentConversation.id,
      sender_id: user.id,
      created_at: new Date(),
      status: "SENDING",
      pending: true,
    };

    //setMessages(prev => [...prev, optimisticMessage]);
    updateConversationWithNewMessage(optimisticMessage, false);

    const success = sendChatMessage?.({
      conversationId: currentConversation.id,
      text: sanitizedText,
      tempId,
    });

    if (!success) {
      setMessages(prev => prev.map(msg =>
        msg.id === tempId ? { ...msg, status: "FAILED" } : msg
      ));
      toast({
        title: "Failed to send",
        description: "Please check your connection and try again",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
    }
  }, [currentConversation, connected, user.id, sendChatMessage, toast, updateConversationWithNewMessage]);

  const handleTyping = useCallback((isTyping: boolean) => {
    if (!currentConversation?.id || !connected || !user.id) return;

    const userName = user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`.trim()
      : user.username || 'Unknown User';

    sendTypingNotification?.({
      conversationId: currentConversation.id,
      isTyping,
      userId: user.id,
      userName,
    });
  }, [currentConversation, connected, user, sendTypingNotification]);

  const handleEditMessage = useCallback((messageId: string, newText: string) => {
    if (!currentConversation?.id || !connected) return;

    const trimmedText = newText.trim().substring(0, MAX_MESSAGE_LENGTH);
    if (!trimmedText) return;

    setMessages(prev =>
      prev.map(m => m.id === messageId
        ? { ...m, message: trimmedText, updated_at: new Date() }
        : m
      )
    );

    sendMessage?.({
      type: "chat:edit_message",
      payload: {
        conversationId: currentConversation.id,
        messageId,
        newText: trimmedText,
      },
      timestamp: new Date().toISOString(),
    });
  }, [currentConversation, connected, sendMessage]);

  const handleDeleteMessage = useCallback((messageId: string) => {
    if (!currentConversation?.id || !connected) return;

    setMessages(prev => prev.filter(m => m.id !== messageId));

    sendMessage?.({
      type: "chat:delete_message",
      payload: {
        conversationId: currentConversation.id,
        messageId,
      },
      timestamp: new Date().toISOString(),
    });
  }, [currentConversation, connected, sendMessage]);





  const handleRetry = useCallback(() => {
    setError(null);
    setRetryCount(prev => prev + 1);
    if (token) {
      fetchConversations();
      if (currentConversation?.id) {
        fetchMessages(currentConversation.id);
      }
    }
  }, [token, currentConversation?.id, fetchConversations, fetchMessages]);

  useEffect(() => {
    const token = getAuthToken();
    setToken(token);
    if (!token) {
      setError("No authentication token found. Please log in.");
    }
  }, []);

  useEffect(() => {
    if (token && !connected) {
      const timer = setTimeout(connect, 100);
      return () => clearTimeout(timer);
    }
  }, [token, connected, connect]);

  useEffect(() => {
    return () => {
      typingTimeouts.forEach(timeout => clearTimeout(timeout));
      disconnect();
    };
  }, [disconnect, typingTimeouts]);

  useEffect(() => {
    if (token) {
      fetchConversations();
    }
  }, [token, fetchConversations]);

  useEffect(() => {
    if (currentConversation?.id && token) {
      fetchMessages(currentConversation.id);
      markConversationAsRead(currentConversation.id);
    } else {
      setMessages([]);
      setTypingUsers(new Set());
    }
  }, [currentConversation?.id, token, fetchMessages, markConversationAsRead]);

  if (error?.includes('Authentication failed')) {
    return (
      <EmptyState
        type="auth"
        title="Authentication Required"
        description="Please log in to access the chat."
      />
    );
  }

  if (error && retryCount >= MAX_RETRIES) {
    return <ErrorBoundary error={error} onRetry={handleRetry} />;
  }

  if (!token && !loadingStates.conversations) {
    return (
      <EmptyState
        type="auth"
        title="No Authentication Token"
        description="Please log in to access the chat."
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={user.photo_url || undefined} alt={displayName} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{displayName}</p>
              <div className="flex items-center gap-1 text-xs">
                <ConnectionStatus connected={connected} reconnectAttempts={reconnectAttempts} />
              </div>
            </div>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4 text-gray-500" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Users"
            >
              <Users className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <UserIdInput />

        {loadingStates.conversations ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="space-y-4 w-full px-4">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonLoader key={i} type="conversation" />
              ))}
            </div>
          </div>
        ) : (
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversation?.id}
            onSelectConversation={setCurrentConversation}
          />
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-white">
        {currentConversation ? (
          <>
            <div className="border-b border-gray-200 p-4 bg-white">
              <h2 className="font-semibold text-lg text-gray-900">
                {currentConversation.conversation_type === "GROUP"
                  ? currentConversation.group_id
                    ? `Group Chat (${currentConversation.group_id})`
                    : "Group Chat"
                  : `User ${getDirectMessageUserId(currentConversation) || 'Unknown'}`}
              </h2>
              {currentConversation.participants && currentConversation.participants.length > 0 && (
                <p className="text-sm text-gray-500">
                  {currentConversation.participants.length} participant{currentConversation.participants.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {loadingStates.messages ? (
              <div className="flex-1 p-4 space-y-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <SkeletonLoader key={i} type="message" />
                ))}
              </div>
            ) : (
              <MessageList
                messages={sortedMessages}
                currentUserId={user.id}
                loading={loadingStates.messages}
                typingUsers={typingUsers}
                onEditMessage={handleEditMessage}
                onDeleteMessage={handleDeleteMessage}
                showStatusIndicators={true}
              />
            )}

            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              disabled={!connected || loadingStates.messages}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {conversations.length > 0 ? (
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm text-gray-400">Choose a conversation to start chatting</p>
              </div>
            ) : (
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No conversations</p>
                <p className="text-sm text-gray-400">You don't have any conversations yet</p>
              </div>
            )}
          </div>
        )}

        {error && retryCount < 3 && (
          <div className="p-3 bg-yellow-100 border-t border-yellow-200 text-yellow-800 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Warning:</span> {error}
              </div>
              <Button onClick={handleRetry} size="sm" variant="outline">
                Retry
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
