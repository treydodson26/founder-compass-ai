
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
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = { role: 'user', content: prompt };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      // Call OpenAI via our service
      const aiResponse = await openaiService.sendMessage(
        prompt,
        founder,
        messages
      );
      
      // Add AI response
      const aiMessage: Message = { role: 'ai', content: aiResponse };
      setMessages([...updatedMessages, aiMessage]);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Implement retry logic
      if (retryCount < maxRetries) {
        const nextRetry = retryCount + 1;
        setRetryCount(nextRetry);
        toast({
          title: 'Retrying',
          description: `Connection issue. Retrying (${nextRetry}/${maxRetries})...`,
          variant: 'default',
        });
        
        // Retry after a delay with exponential backoff
        const backoffTime = 1000 * Math.pow(2, nextRetry);
        setTimeout(() => sendMessage(prompt), backoffTime);
        return;
      }
      
      // If all retries failed
      toast({
        title: 'Error',
        description: 'Failed to get a response from AI. Please try again later.',
        variant: 'destructive',
      });
      
      // Add error message to chat
      const errorMessage: Message = { 
        role: 'ai', 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or use the 'Load Demo' button to see example interactions." 
      };
      setMessages([...updatedMessages, errorMessage]);
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
