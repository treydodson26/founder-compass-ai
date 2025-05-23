
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

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    try {
      setIsLoading(true);
      console.log('Starting sendMessage with prompt:', prompt);
      
      // Add user message
      const userMessage: Message = { role: 'user', content: prompt };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      console.log('Calling OpenAI service with messages count:', updatedMessages.length);
      
      // Call OpenAI via our service
      const aiResponse = await openaiService.sendMessage(
        prompt,
        founder,
        messages
      );
      
      console.log('Received AI response:', aiResponse);
      
      // Add AI response
      const aiMessage: Message = { role: 'ai', content: aiResponse };
      setMessages([...updatedMessages, aiMessage]);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Error sending message - full error object:', error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      // Implement retry logic
      if (retryCount < maxRetries) {
        const nextRetry = retryCount + 1;
        setRetryCount(nextRetry);
        console.log(`Retrying request (${nextRetry}/${maxRetries})...`);
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('All retries failed. Final error:', errorMessage);
      
      toast({
        title: 'Error',
        description: `Failed to get response: ${errorMessage}`,
        variant: 'destructive',
      });
      
      // Add error message to chat
      const errorChatMessage: Message = { 
        role: 'ai', 
        content: `I'm sorry, I'm having trouble connecting right now. Error: ${errorMessage}. Please try again later or use the 'Load Demo' button to see example interactions.` 
      };
      
      const userMessage: Message = { role: 'user', content: prompt };
      const updatedMessages = [...messages, userMessage];
      setMessages([...updatedMessages, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    addMessage,
  };
}
