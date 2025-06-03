"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Conversation } from "@/lib/chat";

interface UserIdInputProps {
  onConversationCreated?: (conversation: Conversation) => void;
}

export default function UserIdInput({ onConversationCreated }: UserIdInputProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getToken = () => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('AccessTokenCookie='))
      ?.split('=')[1];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a username',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const userResponse = await fetch(`http://127.0.0.1:3005/api/profiles/users/id/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || `Failed to find user ${username}`);
      }

      const userData = await userResponse.json();
      const userId = userData.data.id;

      const conversationResponse = await fetch('http://127.0.0.1:3007/api/chat/conversations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participantIds: userId }),
        credentials: 'include',
      });

      if (!conversationResponse.ok) {
        const errorData = await conversationResponse.json();
        throw new Error(errorData.message || `Failed to create conversation`);
      }

      const conversationData = await conversationResponse.json();

      toast({
        title: 'Success',
        description: `Conversation created with user ${username}`,
      });

      if (onConversationCreated) {
        onConversationCreated(conversationData.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create conversation',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setUsername('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={handleSubmit}
          disabled={isLoading || !username.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
