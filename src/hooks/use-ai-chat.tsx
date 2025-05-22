
import { useState } from 'react';
import { Founder } from '@/data/types';
import { openaiService } from '@/services/openai';
import { toast } from '@/hooks/use-toast';

export type Message = {
  role: 'user' | 'ai';
  content: string;
};

export function useAiChat(founder: Founder) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: `Hi there! I have access to ${founder.resources.callRecordings} call recordings, ${founder.resources.emailThreads} email threads, and ${founder.resources.meetingNotes} meeting notes for ${founder.name}. I understand they're currently in ${founder.stage} stage with ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR. How can I help you today?` 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message
      const updatedMessages = [...messages, { role: 'user', content: prompt }];
      setMessages(updatedMessages);
      
      // Call OpenAI via our service
      const aiResponse = await openaiService.sendMessage(
        prompt,
        founder,
        messages
      );
      
      // Add AI response
      setMessages([...updatedMessages, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from AI. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
