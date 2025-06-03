"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Plus, Users, Bell } from "lucide-react"
import type {
  ConversationDetailsResponse,
  ConversationResponse,
  DeleteMessagePayload,
  EditMessagePayload,
  GroupDetailsResponse,
  MessageSentPayload,
  PongPayload,
  PresencePayload,
  User,
  Message,
  Conversation,
  ConversationParticipant,
  ParticipantRole
} from "@/lib/chat"
import UserIdInput from "@/components/chat/useridinput"

type ConversationType = "DIRECT" | "GROUP"

interface Notification {
  id: string
  message: string
  created_at: Date
  read_status: boolean
  user_id: string
}

interface ConversationWithUsername extends Conversation {
  otherUserUsername?: string
  unread_count: number
}

const DEFAULT_API_CONFIG = {
  baseUrl: "http://127.0.0.1:3007",
  wsUrl: "ws://127.0.0.1:3007/",
}

const getAccessTokenCookie = (token_name = "AccessTokenCookie") => {
  if (typeof document === "undefined") return null
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === token_name) {
      return value
    }
  }
  return null
}

async function getUsernameByUserId(userid: string) {
  const token = getAccessTokenCookie();
  const id = userid.replace(/^"|"$/g, '');

  const response = await fetch(`http://127.0.0.1:3005/api/profiles/users/username/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
  }

  return response.json();
}

class ChatAPIService {
  private baseUrl: string
  private wsUrl: string

  constructor(config = DEFAULT_API_CONFIG) {
    this.baseUrl = config.baseUrl
    this.wsUrl = config.wsUrl
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = getAccessTokenCookie()
    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    }

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
      credentials: "include",
    })

    if (!response.ok) {
      let errorBody
      try {
        errorBody = await response.json()
      } catch (e) {
        errorBody = await response.text()
        console.error(e)
      }
      console.error("API Error Response:", errorBody)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody?.message || response.statusText}`)
    }

    return response.json()
  }

  async getUser(userid: string) {
    return fetch(`http://127.0.0.1:3005/api/profiles/users/${userid}`, {
      method: "GET",
      credentials: "include",
    })
  }

  async getConversations(limit = 50, offset = 0): Promise<{ data: Conversation[] }> {
    return this.fetchWithAuth(`/api/chat/conversations?limit=${limit}&offset=${offset}`, {
      method: "GET",
    })
  }

  async createConversation(data: { group_id?: string; conversation_type: ConversationType; participantIds: string[] }) {
    return this.fetchWithAuth("/api/chat/conversations", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getConversationDetails(conversationId: string): Promise<ConversationDetailsResponse> {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}`)
  }

  async markConversationRead(conversationId: string) {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}/read`, {
      method: "POST",
    })
  }

  async getMessages(conversationId: string, limit = 50, offset = 0): Promise<{ data: Message[] }> {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`)
  }

  async sendMessage(conversationId: string, messageText: string) {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message: messageText }),
    })
  }

  async editMessage(conversationId: string, messageId: string, messageText: string) {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}/messages/${messageId}`, {
      method: "PUT",
      body: JSON.stringify({ message: messageText }),
    })
  }

  async deleteMessage(conversationId: string, messageId: string) {
    return this.fetchWithAuth(`/api/chat/conversations/${conversationId}/messages/${messageId}`, {
      method: "DELETE",
    })
  }

  async getNotifications(limit = 50, offset = 0, unreadOnly = false): Promise<{ data: Notification[] }> {
    return this.fetchWithAuth(`/api/chat/notifications?limit=${limit}&offset=${offset}&unreadOnly=${unreadOnly}`)
  }

  async markAllNotificationsRead() {
    return this.fetchWithAuth("/api/chat/notifications/mark-all-read", {
      method: "POST",
    })
  }
}

class WebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private messageHandlers: Map<string, (payload: any) => void> = new Map()
  private wsUrl: string
  public token: string | null
  private isConnecting = false

  constructor(wsUrl: string, token: string | null) {
    this.wsUrl = wsUrl
    this.token = token
  }

  connect() {
    if (typeof WebSocket === "undefined") {
      console.warn("WebSocket is not available in this environment.")
      return
    }

    if (!this.token) {
      console.warn("WebSocket connection deferred: No token available.")
      return
    }

    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.CONNECTING)) {
      console.log("WebSocket connection already in progress")
      return
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected")
      return
    }

    try {
      this.isConnecting = true
      const url = `${this.wsUrl}?token=${this.token}`
      this.ws = new WebSocket(url)

      console.log("Attempting to connect to WebSocket:", url)

      this.ws.onopen = () => {
        console.log("WebSocket connected successfully")
        this.reconnectAttempts = 0
        this.isConnecting = false
      }

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data as string)
          console.log("WebSocket message received:", message)
          const handler = this.messageHandlers.get(message.type)
          if (handler) {
            if (message.type === "connection_established") {
              handler({
                payload: {
                  userId: message.userId,
                  connectionId: message.connectionId,
                },
              })
            } else {
              handler(message.payload || message)
            }
          } else {
            console.warn(`No handler for WebSocket message type: ${message.type}`)
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error, "Raw data:", event.data)
        }
      }

      this.ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason)
        this.isConnecting = false

        if (event.code !== 1000 && event.code !== 1001 && event.code !== 1005) {
          this.reconnect()
        }
      }

      this.ws.onerror = (error) => {
        console.log("WebSocket error:", error)
        this.isConnecting = false
      }
    } catch (error) {
      console.error("Error initializing WebSocket connection:", error)
      this.isConnecting = false
      this.reconnect()
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      console.log(`WebSocket attempting to reconnect (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms...`)

      setTimeout(() => {
        this.connect()
      }, delay)
    } else {
      console.error("WebSocket max reconnect attempts reached.")
    }
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          ...message,
          timestamp: new Date().toISOString(),
        }),
      )
    } else {
      console.warn("WebSocket not connected. Message not sent:", message)
    }
  }

  onMessage(type: string, handler: (payload: any) => void) {
    this.messageHandlers.set(type, handler)
  }

  updateToken(newToken: string | null) {
    const wasConnected = this.ws && this.ws.readyState === WebSocket.OPEN
    this.token = newToken

    if (newToken && !wasConnected) {
      this.connect()
    }
  }

  disconnect() {
    if (this.ws) {
      console.log("WebSocket disconnecting...")
      this.ws.close(1000, "Client initiated disconnect")
      this.ws = null
    }
    this.isConnecting = false
    this.reconnectAttempts = 0
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

export default function ChatInterface() {
  const [conversations, setConversations] = useState<ConversationWithUsername[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>([])

  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>()

  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const [isTyping, setIsTyping] = useState(false)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const currentUserRef = useRef(currentUser)
  const activeConversationRef = useRef(activeConversation)

  const apiService = useRef(new ChatAPIService())
  const wsService = useRef<WebSocketService | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const [usernameCache, setUsernameCache] = useState<Map<string, string>>(new Map())

  const getOtherParticipantId = (conversation: Conversation, user: User | undefined): string | null => {
    if (!user || conversation.conversation_type !== 'DIRECT' || !conversation.participants) {
      return null
    }

    const otherParticipant = conversation.participants.find(p => p.user_id !== user.id);
    return JSON.stringify(otherParticipant) || null;
  }

  const fetchAndCacheUsername = async (userId: string): Promise<string> => {
    if (usernameCache.has(userId)) {
      return usernameCache.get(userId)!
    }

    try {
      const response = await getUsernameByUserId(userId)

      const username = response.data.username || `User ${userId.slice(0, 6)}`
      setUsernameCache(prev => new Map(prev).set(userId, username))

      return username

    } catch (error) {
      console.error(`Error fetching username for user ${userId}:`, error)
    }

    const fallbackUsername = `User ${userId.slice(0, 6)}`
    setUsernameCache(prev => new Map(prev).set(userId, fallbackUsername))
    return fallbackUsername
  }

  const loadConversationUsernames = async (
    rawConversations: Conversation[]
  ): Promise<ConversationWithUsername[]> => {
    const currentLoggedInUser = currentUserRef.current;

    if (!currentLoggedInUser) {
      return rawConversations.map(conv => ({
        ...conv,
        otherUserUsername: undefined,
        unread_count: conv.unread_count || 0,
      }));
    }

    const conversationsWithUsernames: ConversationWithUsername[] = await Promise.all(
      rawConversations.map(async (conversation) => {
        let otherUserUsername: string | undefined = undefined;

        if (conversation.conversation_type === 'DIRECT' && Array.isArray(conversation.participants)) {
          const otherParticipant = conversation.participants.find(
            participant => participant.user_id !== currentLoggedInUser.id
          );

          if (otherParticipant) {
            otherUserUsername = await fetchAndCacheUsername(otherParticipant.user_id);
          }
        }

        return {
          ...conversation,
          otherUserUsername,
          unread_count: conversation.unread_count || 0,
        };
      })
    );

    return conversationsWithUsernames;
  };

  const getConversationDisplayName = (conversation: ConversationWithUsername): string => {
    if (conversation.conversation_type === "GROUP") {
      return conversation?.group_id?.slice(0, 7) || "Group Chat"
    }
    return conversation.otherUserUsername || "Loading..."
  }
  const getActiveConversationDisplayName = (activeConvId: string | null, convs: ConversationWithUsername[]): string => {
    if (!activeConvId) return ""
    const conversation = convs.find(c => c.id === activeConvId)
    return conversation ? getConversationDisplayName(conversation) : ""
  }

  const conversationHandlers = {
    "chat:conversation_created": async (payload: ConversationResponse) => {
      const currentRefUser = currentUserRef.current

      const newConversation: Conversation = {
        id: payload.id,
        group_id: payload.group_id || null,
        conversation_type: payload.conversation_type,
        created_at: new Date(payload.created_at),
        updated_at: new Date(payload.updated_at),
        participants: [],
        unread_count: 0
      }

      let otherUserUsername: string | undefined = undefined
      if (newConversation.conversation_type === 'DIRECT' && currentRefUser) {
        try {
          const details = await apiService.current.getConversationDetails(payload.id)
          //@ts-expect-error : missing field 
          newConversation.participants = details.participants
          const otherUserId = getOtherParticipantId(newConversation, currentRefUser)
          if (otherUserId) {
            otherUserUsername = await fetchAndCacheUsername(otherUserId)
          }
        } catch (error) {
          console.error("Error fetching conversation details:", error)
        }
      }

      const newConversationWithUsername: ConversationWithUsername = {
        ...newConversation,
        otherUserUsername,
        unread_count: 0
      }

      setConversations(prev => [...prev, newConversationWithUsername])
    },

    "chat:conversation_updated": async (payload: ConversationDetailsResponse) => {
      const currentRefUser = currentUserRef.current

      setConversations(prev => {
        return prev.map(conv => {
          if (conv.id === payload.id) {
            const updatedConv: ConversationWithUsername = {
              ...conv,
              group_id: payload.group_id || null,
              conversation_type: payload.conversation_type,
              participants: payload.participants,
              unread_count: conv.unread_count
            }

            if (updatedConv.conversation_type === 'DIRECT' && currentRefUser) {
              const otherUserId = getOtherParticipantId(updatedConv, currentRefUser)
              if (otherUserId) {
                fetchAndCacheUsername(otherUserId).then(username => {
                  setConversations(prev2 =>
                    prev2.map(c => c.id === payload.id ? { ...c, otherUserUsername: username } : c)
                  )
                })
              }
            }

            return updatedConv
          }
          return conv
        })
      })
    },

    "chat:group_updated": (payload: GroupDetailsResponse) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.group_id === payload.id
            ? {
              ...conv,
              title: payload.title, // using splice group id .
            }
            : conv
        )
      )
    },
  }

  const memberHandlers = {
    "chat:member_added": async (payload: { conversationId: string; userId: string }) => {
      const currentRefUser = currentUserRef.current

      setConversations(prev => {
        return prev.map(conv => {
          if (conv.id === payload.conversationId) {
            const updatedParticipants: ConversationParticipant[] = [
              ...(conv.participants || []),
              {
                conversation_id: payload.conversationId,
                user_id: payload.userId,
                role: "MEMBER" as ParticipantRole,
                created_at: new Date(),
              },
            ]

            const updatedConv: ConversationWithUsername = {
              ...conv,
              participants: updatedParticipants
            }

            if (updatedConv.conversation_type === 'DIRECT' && currentRefUser) {
              const otherUserId = getOtherParticipantId(updatedConv, currentRefUser)
              if (otherUserId) {
                fetchAndCacheUsername(otherUserId).then(username => {
                  setConversations(prev2 =>
                    prev2.map(c => c.id === payload.conversationId ? { ...c, otherUserUsername: username } : c)
                  )
                })
              }
            }

            return updatedConv
          }
          return conv
        })
      })
    },

    "chat:member_removed": async (payload: { conversationId: string; userId: string }) => {
      const currentRefUser = currentUserRef.current

      setConversations(prev => {
        return prev.map(conv => {
          if (conv.id === payload.conversationId) {
            const updatedParticipants = (conv.participants || []).filter(p => p.user_id !== payload.userId)
            const updatedConv: ConversationWithUsername = {
              ...conv,
              participants: updatedParticipants
            }

            if (updatedConv.conversation_type === 'DIRECT' && currentRefUser) {
              const otherUserId = getOtherParticipantId(updatedConv, currentRefUser)
              if (otherUserId) {
                fetchAndCacheUsername(otherUserId).then(username => {
                  setConversations(prev2 =>
                    prev2.map(c => c.id === payload.conversationId ? { ...c, otherUserUsername: username } : c)
                  )
                })
              } else {
                setConversations(prev2 =>
                  prev2.map(c => c.id === payload.conversationId ? { ...c, otherUserUsername: undefined } : c)
                )
              }
            }

            return updatedConv
          }
          return conv
        })
      })
    },

    "chat:member_role_updated": (payload: { conversationId: string; userId: string; role: ParticipantRole }) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === payload.conversationId
            ? {
              ...conv,
              participants: (conv.participants || []).map(p =>
                p.user_id === payload.userId ? { ...p, role: payload.role } : p
              ),
            }
            : conv
        )
      )
    },
  }

  const messageHandlers = {
    "chat:new_message": (newMessagePayload: Message) => {
      console.log("New message received:", newMessagePayload)
      updateConversationLastMessage(
        newMessagePayload.conversation_id,
        newMessagePayload.message,
      )

      if (newMessagePayload.conversation_id === activeConversationRef.current) {
        setMessages(prevMessages => {
          const filteredMessages = prevMessages.filter(msg =>
            !(msg.pending &&
              msg.message === newMessagePayload.message &&
              msg.sender_id === newMessagePayload.sender_id &&
              Math.abs(new Date(msg.created_at).getTime() - new Date(newMessagePayload.created_at).getTime()) < 5000)
          )
          const updatedMessages = [...filteredMessages, newMessagePayload].sort((a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
          return updatedMessages
        })
      }

      const currentUserValue = currentUserRef.current
      const activeConversationValue = activeConversationRef.current

      if (currentUserValue &&
        newMessagePayload.sender_id !== currentUserValue.id &&
        activeConversationValue === newMessagePayload.conversation_id) {
        apiService.current.markConversationRead(activeConversationValue).catch(console.error)
        updateConversationUnreadCount(activeConversationValue, 0)
      } else if (currentUserValue && newMessagePayload.sender_id !== currentUserValue.id) {
        setConversations(prev =>
          prev.map(c =>
            c.id === newMessagePayload.conversation_id
              ? { ...c, unread_count: c.unread_count + 1 }
              : c
          )
        )
      }
    },

    "chat:message_ack": (payload: { tempId: string; message: Message }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === payload.tempId ? { ...payload.message, pending: false } : msg
        )
      )
    },

    "chat:message_sent": (payload: MessageSentPayload) => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === payload.tempId ? { ...payload.message, pending: false } : msg
        )
      )
    },

    "chat:edit_message": (payload: EditMessagePayload) => {
      if (payload.conversationId === activeConversationRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === payload.messageId
              ? { ...msg, message: payload.newText, updated_at: new Date() }
              : msg
          )
        )
      }
    },

    "chat:delete_message": (payload: DeleteMessagePayload) => {
      if (payload.conversationId === activeConversationRef.current) {
        setMessages(prev => prev.filter(msg => msg.id !== payload.messageId))
      }
    },
  }

  const otherHandlers = {
    "typing": (payload: { conversationId: string; userId: string; userName: string; isTyping: boolean }) => {
      const activeConversationValue = activeConversationRef.current
      const currentUserValue = currentUserRef.current

      if (payload.conversationId === activeConversationValue &&
        currentUserValue &&
        payload.userId !== currentUserValue.id) {
        setTypingUsers(prev => {
          const newSet = new Set(prev)
          // not implemented properly and integrated
          payload.isTyping ? newSet.add(payload.userName) : newSet.delete(payload.userName)
          return newSet
        })
      }
    },

    "presence": (payload: PresencePayload) => {
      setUsers(prev =>
        prev.map(user =>
          user.id === payload.userId ? { ...user, status: payload.status } : user
        )
      )
    },

    "pong": (payload: PongPayload) => {
      console.log("Pong received", payload.serverTime)
    },
  }

  const notificationHandlers = {
    "notification:new": (payload: Notification) => {
      setNotifications(prev => [
        ...prev,
        {
          id: payload.id,
          message: payload.message,
          created_at: new Date(payload.created_at),
          read_status: payload.read_status,
          user_id: payload.user_id,
        },
      ])
    },

    "notification:read": (payload: { id: string }) => {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === payload.id ? { ...notif, read_status: true } : notif
        )
      )
    },
  }

  const registerHandlers = (ws: WebSocketService) => {
    const allHandlers = {
      ...conversationHandlers,
      ...memberHandlers,
      ...messageHandlers,
      ...otherHandlers,
      ...notificationHandlers,
    }

    Object.entries(allHandlers).forEach(([event, handler]) => {
      ws.onMessage(event, handler as (payload: any) => void)
    })
  }

  const loadUserData = async (userId: string) => {
    try {
      setIsLoadingUser(true)
      const userResponse = await apiService.current.getUser(userId)
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setCurrentUser(userData.data)
      }
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setIsLoadingUser(false)
    }
  }

  useEffect(() => {
    currentUserRef.current = currentUser
  }, [currentUser])

  useEffect(() => {
    activeConversationRef.current = activeConversation
  }, [activeConversation])

  useEffect(() => {
    const token = getAccessTokenCookie()
    setAccessToken(token)
    if (!token) return

    if (!wsService.current) {
      wsService.current = new WebSocketService(DEFAULT_API_CONFIG.wsUrl, token)
    }

    wsService.current.connect()
    wsService.current.onMessage("connection_established", (message: {
      payload: {
        connectionId: string
        userId: string
      }
    }) => {
      console.log("WebSocket connection established:", message.payload)
      loadUserData(message.payload.userId)
    })

    if (wsService.current) {
      registerHandlers(wsService.current)
    }

    return () => {
      wsService.current?.disconnect()
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (accessToken && currentUser) {
      loadInitialData()
    }
  }, [accessToken, currentUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadInitialData = async () => {
    await loadConversations()
    await loadNotifications()
  }

  const loadConversations = async () => {
    if (!accessToken || !currentUserRef.current) return

    try {

      const response = await apiService.current.getConversations();
      const conversationsFromAPI = response.data || [];
      const currentUserId = currentUser?.id;
      const conversationsWithParticipants = await Promise.all(
        conversationsFromAPI.map(async (conv) => {
          const participantsDetails = await apiService.current.getConversationDetails(conv.id);
          const filteredParticipants = (participantsDetails.participants || []).filter(
            participant => participant.user_id !== currentUserId
          );
          return {
            ...conv,
            participants: filteredParticipants,
          };
        })
      );

      const conversationsWithUsernames = await loadConversationUsernames(conversationsWithParticipants)
      setConversations(conversationsWithUsernames)
    } catch (error) {
      console.error("Error loading conversations:", error)
    }
  }

  const loadMessages = async (conversationId: string) => {
    if (!accessToken) return

    setIsLoadingMessages(true)
    try {
      const response = await apiService.current.getMessages(conversationId)
      const sortedMessages = (response.data || []).sort((a: Message, b: Message) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setMessages(sortedMessages)

      await apiService.current.markConversationRead(conversationId)
      updateConversationUnreadCount(conversationId, 0)
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const loadNotifications = async () => {
    if (!accessToken) return

    try {
      const response = await apiService.current.getNotifications(10, 0, true)
      setNotifications(response.data || [])
    } catch (error) {
      console.error("Error loading notifications:", error)
    }
  }

  const updateConversationLastMessage = (conversationId: string, messageText: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? { ...c, last_message: messageText, updated_at: new Date() }
          : c
      )
    )
  }

  const updateConversationUnreadCount = (conversationId: string, count: number) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, unread_count: count } : c
      )
    )
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversationRef.current || !accessToken || !currentUserRef.current) return

    const tempId = `temp_${Date.now()}`
    const tempMessage: Message = {
      id: tempId,
      message: newMessage,
      created_at: new Date(),
      status: "SENT",
      sender_id: currentUserRef.current.id,
      conversation_id: activeConversationRef.current,
      pending: true,
    }

    setMessages(prev =>
      [...prev, tempMessage].sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    )

    const messageToSend = newMessage
    setNewMessage("")

    wsService.current?.send({
      type: "chat:send_message",
      payload: {
        conversationId: activeConversationRef.current,
        text: messageToSend,
        tempId: tempId,
      },
    })

    handleStopTyping()
  }

  const handleTyping = () => {
    if (!activeConversationRef.current || !accessToken || !currentUserRef.current) return

    if (!isTyping) {
      setIsTyping(true)
      wsService.current?.send({
        type: "typing",
        payload: {
          conversationId: activeConversationRef.current,
          userId: currentUserRef.current.id,
          userName: currentUserRef.current.username,
          isTyping: true,
        },
      })
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping()
    }, 2000)
  }

  const handleStopTyping = () => {
    if (isTyping && activeConversationRef.current && accessToken && currentUserRef.current) {
      setIsTyping(false)
      wsService.current?.send({
        type: "typing",
        payload: {
          conversationId: activeConversationRef.current,
          userId: currentUserRef.current.id,
          userName: currentUserRef.current.username,
          isTyping: false,
        },
      })
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  const selectConversation = (conversationId: string) => {
    setActiveConversation(conversationId)
    setMessages([])
    loadMessages(conversationId)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTime = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getDisplayName = (userId: string) => {
    const currentRefUser = currentUserRef.current
    if (!currentRefUser) return `User ${userId.slice(0, 6)}`
    if (userId === currentRefUser.id) return "You"

    const cachedUsername = usernameCache.get(userId)
    if (cachedUsername) return cachedUsername

    return `User ${userId.slice(0, 6)}`
  }

  if (!accessToken) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <p className="text-xl text-gray-700">Please log in to use the chat.</p>
      </div>
    )
  }

  if (isLoadingUser || !currentUser) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="md:w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
            <div className="flex items-center space-x-1">
              <button
                title="Notifications"
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read_status).length > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>
              <button title="New Chat" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="relative">
            <UserIdInput />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <p className="p-4 text-center text-gray-500">No conversations yet.</p>
          )}
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => selectConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${activeConversation === conversation.id
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : "border-l-4 border-l-transparent"
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {conversation.conversation_type === "GROUP" ? (
                    <span className="flex items-center">
                      <Users size={16} className="mr-2 text-gray-600" />
                      {getConversationDisplayName(conversation)}
                    </span>
                  ) : (
                    getConversationDisplayName(conversation)
                  )}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTime(conversation.updated_at)}
                </span>
              </div>
              {conversation.unread_count > 0 && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  {conversation.unread_count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 p-3 md:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3 ${conversations.find(c => c.id === activeConversation)?.conversation_type === 'GROUP'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                    }`}>
                    {conversations.find(c => c.id === activeConversation)?.conversation_type === 'GROUP'
                      ? <Users size={20} />
                      : <UserIcon size={20} />}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {getActiveConversationDisplayName(activeConversation, conversations)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {isLoadingMessages && (
                <p className="text-center text-gray-500">Loading messages...</p>
              )}
              {!isLoadingMessages && messages.length === 0 && (
                <p className="text-center text-gray-500">No messages in this conversation yet. Say hello!</p>
              )}
              {messages.map(message => {
                const user = currentUserRef.current
                if (!user) return null

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-xl shadow-sm ${message.sender_id === user.id
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                        } ${message.pending ? "opacity-60" : ""}`}
                    >
                      {message.sender_id !== user.id && (
                        <p className="text-xs font-medium mb-0.5 opacity-80">
                          {getDisplayName(message.sender_id)}
                        </p>
                      )}
                      <p className="break-words">{message.message ?? "Message unavailable"}</p>
                      <div
                        className={`flex items-center mt-1 ${message.sender_id === user.id ? "justify-end" : "justify-start"
                          }`}
                      >
                        <span
                          className={`text-xs opacity-70 ${message.sender_id === user.id ? "text-blue-100" : "text-gray-500"
                            }`}
                        >
                          {formatTime(message.created_at)}
                        </span>
                        {message.sender_id === user.id && !message.pending && (
                          <span className="ml-1.5 text-xs opacity-90">✓</span>
                        )}
                        {message.sender_id === user.id && message.status === 'READ' && !message.pending && (
                          <span className="ml-1.5 text-xs opacity-90">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Typing indicator */}
            {typingUsers.size > 0 && activeConversationRef.current && (
              <div className="px-4 pb-2 text-sm text-gray-500">
                {Array.from(typingUsers).join(", ")} {typingUsers.size === 1 ? "is" : "are"} typing...
              </div>
            )}

            {/* Message input */}
            <div className="bg-white border-t border-gray-200 p-3 md:p-4">
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  title="Attach file"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <Plus size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => {
                      setNewMessage(e.target.value)
                      handleTyping()
                    }}
                    onBlur={handleStopTyping}
                    onKeyPress={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  title="Send message"
                  className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Welcome to Chat</h3>
              <p className="text-sm text-gray-500">
                Select a conversation from the sidebar to start chatting or create a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const UserIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)
