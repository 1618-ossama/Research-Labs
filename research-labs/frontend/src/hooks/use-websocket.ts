"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type {
  S2CWebSocketMessage,
  C2SWebSocketMessage,
  TypingPayload,
  SendMessagePayload,
  EditMessagePayload,
  DeleteMessagePayload,
  UserStatus
} from "../lib/chat";

interface WebSocketOptions {
  url?: string;
  token?: string | null;
  onMessage?: (message: S2CWebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: (event: CloseEvent) => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  pingInterval?: number;
  autoConnect?: boolean;
}

interface WebSocketState {
  connected: boolean;
  connecting: boolean;
  lastMessage: S2CWebSocketMessage | null;
  error: string | null;
  reconnectAttempts: number;
}

export function useWebSocket(options: WebSocketOptions = {}) {
  const {
    url,
    token,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    pingInterval = 30000,
    autoConnect = true,
  } = options;

  const [state, setState] = useState<WebSocketState>({
    connected: false,
    connecting: false,
    lastMessage: null,
    error: null,
    reconnectAttempts: 0,
  });

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: C2SWebSocketMessage): boolean => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      return false;
    }
    try {
      socketRef.current.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
      setState(prev => ({ ...prev, error: "Failed to send message" }));
      return false;
    }
  }, []);

  const setupPing = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }

    pingIntervalRef.current = setInterval(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        const pingMsg: C2SWebSocketMessage = {
          type: "ping",
          payload: { timestamp: new Date().toISOString() },
          timestamp: new Date().toISOString()
        };
        sendMessage(pingMsg);
      }
    }, pingInterval);
  }, [pingInterval, sendMessage]);

  const connect = useCallback(() => {
    if (!url || !token) {
      setState(prev => ({
        ...prev,
        error: !url ? "WebSocket URL not provided" : "Authentication token not provided"
      }));
      return;
    }

    if (state.connecting || socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setState(prev => ({ ...prev, connecting: true, error: null }));

    try {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const wsUrl = new URL(url);
      wsUrl.searchParams.set("token", token);
      const socket = new WebSocket(wsUrl.toString());
      console.log(wsUrl.toString());


      socket.onopen = () => {
        if (!mountedRef.current) return;
        setState(prev => ({
          ...prev,
          connected: true,
          connecting: false,
          error: null,
          reconnectAttempts: 0,
        }));
        setupPing();
        onConnect?.();
      };

      socket.onmessage = (event) => {
        if (!mountedRef.current) return;
        try {
          const parsedData = JSON.parse(event.data) as S2CWebSocketMessage;
          setState(prev => ({ ...prev, lastMessage: parsedData }));
          onMessage?.(parsedData);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
          setState(prev => ({
            ...prev,
            error: "Failed to parse message from server"
          }));
        }
      };

      socket.onclose = (event: CloseEvent) => {
        if (!mountedRef.current) return;
        setState(prev => ({
          ...prev,
          connected: false,
          connecting: false,
        }));
        clearTimers();
        onDisconnect?.(event);

        if (event.code !== 1000 && state.reconnectAttempts < maxReconnectAttempts) {
          const nextAttempt = state.reconnectAttempts + 1;
          setState(prev => ({ ...prev, reconnectAttempts: nextAttempt }));
          reconnectTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) connect();
          }, reconnectInterval);
        } else if (state.reconnectAttempts >= maxReconnectAttempts) {
          setState(prev => ({
            ...prev,
            error: "Max reconnection attempts reached",
          }));
        }
      };

      socket.onerror = (errorEvent: Event) => {
        console.error("WebSocket error:", errorEvent);
        setState(prev => ({
          ...prev,
          error: "WebSocket connection failed",
          connecting: false,
        }));
        onError?.(errorEvent);
      };

      socketRef.current = socket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setState(prev => ({
        ...prev,
        error: "Failed to create connection",
        connecting: false,
      }));
    }
  }, [
    url,
    token,
    state.connecting,
    state.reconnectAttempts,
    maxReconnectAttempts,
    reconnectInterval,
    setupPing,
    onConnect,
    onDisconnect,
    onError,
    onMessage,
    clearTimers
  ]);

  const disconnect = useCallback((code: number = 1000, reason?: string) => {
    clearTimers();
    if (socketRef.current) {
      socketRef.current.close(code, reason);
      socketRef.current = null;
    }
    setState(prev => ({
      ...prev,
      connected: false,
      connecting: false,
      reconnectAttempts: maxReconnectAttempts,
    }));
  }, [clearTimers, maxReconnectAttempts]);

  // Helper methods for specific message types
  const sendTypingNotification = useCallback((payload: TypingPayload): boolean => {
    const message: C2SWebSocketMessage = {
      type: 'typing',
      payload,
      timestamp: new Date().toISOString()
    };
    return sendMessage(message);
  }, [sendMessage]);

  const sendPresenceUpdate = useCallback((status: UserStatus, userId: string): boolean => {
    const message: C2SWebSocketMessage = {
      type: 'presence',
      payload: { userId, status },
      timestamp: new Date().toISOString()
    };
    return sendMessage(message);
  }, [sendMessage]);

  const sendChatMessage = useCallback((payload: SendMessagePayload): boolean => {
    const message: C2SWebSocketMessage = {
      type: 'chat:send_message',
      payload,
      timestamp: new Date().toISOString()
    };
    return sendMessage(message);
  }, [sendMessage]);

  const sendEditMessage = useCallback((payload: EditMessagePayload): boolean => {
    const message: C2SWebSocketMessage = {
      type: 'chat:edit_message',
      payload,
      timestamp: new Date().toISOString()
    };
    return sendMessage(message);
  }, [sendMessage]);

  const sendDeleteMessage = useCallback((payload: DeleteMessagePayload): boolean => {
    const message: C2SWebSocketMessage = {
      type: 'chat:delete_message',
      payload,
      timestamp: new Date().toISOString()
    };
    return sendMessage(message);
  }, [sendMessage]);

  useEffect(() => {
    if (autoConnect && token && url && !state.connected && !state.connecting && state.reconnectAttempts < maxReconnectAttempts) {
      connect();
    }
  }, [autoConnect, token, url, state.connected, state.connecting, state.reconnectAttempts, connect, maxReconnectAttempts]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimers();
      disconnect(1000, "Component unmounting");
    };
  }, [clearTimers, disconnect]);

  return {
    connected: state.connected,
    connecting: state.connecting,
    error: state.error,
    lastMessage: state.lastMessage,
    reconnectAttempts: state.reconnectAttempts,
    sendMessage,
    sendTypingNotification,
    sendPresenceUpdate,
    sendChatMessage,
    sendEditMessage,
    sendDeleteMessage,
    connect,
    disconnect,
  };
}
