"use client";

import type { Message } from "@/lib/chat";
import { formatDistanceToNow, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Edit2, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  loading?: boolean;
  typingUsers?: Set<string>;
  onEditMessage?: (messageId: string, newText: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

export default function MessageList({
  messages,
  currentUserId,
  loading = false,
  typingUsers = new Set(),
  onEditMessage,
  onDeleteMessage,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (scrollRef.current && autoScroll) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [messages, typingUsers, autoScroll]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setAutoScroll(isNearBottom);
    }
  };

  const handleEditStart = (message: Message) => {
    setEditingMessageId(message.id);
    setEditText(message.message);
  };

  const handleEditSave = () => {
    if (editingMessageId && editText.trim() && onEditMessage) {
      onEditMessage(editingMessageId, editText.trim());
      setEditingMessageId(null);
      setEditText("");
    }
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  const handleDelete = (messageId: string) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit2 className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-1">No messages yet</p>
          <p className="text-gray-500">Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 p-4 bg-gray-50 overflow-y-auto"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <div className="space-y-4 max-w-4xl mx-auto">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender_id === currentUserId;
          const isEditing = editingMessageId === message.id;
          const showAvatar = !isCurrentUser && (index === 0 || messages[index - 1].sender_id !== message.sender_id);
          const showTimestamp =
            index === 0 ||
            new Date(message.created_at).getTime() - new Date(messages[index - 1].created_at).getTime() > 300000;

          return (
            <div key={message.id}>
              {showTimestamp && (
                <div className="flex justify-center my-4">
                  <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border">
                    {format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
              )}

              <div className={cn("flex gap-3", isCurrentUser ? "justify-end" : "justify-start")}>
                {!isCurrentUser && (
                  <div className="flex-shrink-0">
                    {showAvatar ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback className="text-xs">U</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                )}

                <div className={cn("max-w-[70%] group relative", isCurrentUser ? "order-1" : "order-2")}>
                  {!isCurrentUser && showAvatar && (
                    <div className="mb-1 px-1">
                      <span className="text-sm font-medium text-gray-700">
                        User {message.sender_id.slice(0, 4)}
                      </span>
                    </div>
                  )}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 relative",
                      isCurrentUser
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 border rounded-bl-md shadow-sm",
                    )}
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditSave();
                            if (e.key === "Escape") handleEditCancel();
                          }}
                          className="text-sm border-0 p-0 bg-transparent focus:ring-0"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={handleEditSave} className="h-6 px-2">
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleEditCancel} className="h-6 px-2">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="break-words">
                          {message.message}
                          {message.updated_at && (
                            <span
                              className={cn(
                                "text-xs ml-2 opacity-70",
                                isCurrentUser ? "text-blue-100" : "text-gray-500",
                              )}
                            >
                              (edited)
                            </span>
                          )}
                        </div>

                        <div
                          className={cn(
                            "text-xs mt-1 flex items-center gap-1",
                            isCurrentUser ? "text-blue-100" : "text-gray-500",
                          )}
                        >
                          <span>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                          {message.status !== "SENT" && (
                            <>
                              <span>•</span>
                              <span>Sending...</span>
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {isCurrentUser && !isEditing && message.status !== "SENT" && (
                      <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1 bg-white rounded-lg shadow-lg border p-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-gray-100"
                            onClick={() => handleEditStart(message)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                            onClick={() => handleDelete(message.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {typingUsers.size > 0 && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8" />
              <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {Array.from(typingUsers).join(", ")} {typingUsers.size === 1 ? "is" : "are"} typing
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
