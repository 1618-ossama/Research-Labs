"use client";

import type { Conversation } from "@/lib/chat";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { MessageCircle, Users, User } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  currentConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  currentUserId,
  currentConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const getConversationName = (conversation: Conversation) => {
    if (conversation.conversation_type === "GROUP") {
      return conversation.group_id || "Group Chat";
    }
    console.log(currentUserId, "  Passed as arg to conv list");

    return conversation
      ? `User ${conversation.id.slice(0, 6)}`
      : "Direct Message";
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-lg text-gray-900">Messages</h2>
        <p className="text-sm text-gray-500 mt-1">{conversations.length} conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No conversations</p>
            <p className="text-sm">Start a new conversation to begin chatting</p>
          </div>
        ) : (
          <div className="py-2 overflow-y">
            {conversations.map((conversation) => {
              const conversationName = getConversationName(conversation);

              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 border-transparent",
                    currentConversationId === conversation.id && "bg-blue-50 border-l-blue-500",
                  )}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {conversation.conversation_type === "GROUP" ? (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {conversationName}
                        </h3>
                        {conversation.unread_count ? (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0 animate-bounce">
                            {conversation.unread_count}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate max-w-[70%]">
                          {conversation.last_message?.toString() || "No messages yet"}
                        </p>
                        {conversation.updated_at && (
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
