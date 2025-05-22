
import { Founder } from '@/data/types';
import type { Message } from '@/hooks/use-ai-chat';

// This service handles OpenAI API interactions through Supabase Edge Functions
export const openaiService = {
  /**
   * Send a message to OpenAI and get a response
   */
  sendMessage: async (
    message: string, 
    founder: Founder, 
    conversationHistory: Message[]
  ) => {
    try {
      // Format the conversation history for the API
      const formattedHistory = conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Prepare the system message with context about the founder
      const systemMessage = {
        role: 'system',
        content: `You are an AI assistant with access to information about ${founder.name}, founder of ${founder.companyName}. 
          They're currently in ${founder.stage} stage with ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR.
          You have access to ${founder.resources.callRecordings} call recordings, ${founder.resources.emailThreads} email threads, and ${founder.resources.meetingNotes} meeting notes.
          Provide helpful insights and advice based on this context.`
      };

      // Make the API call to the Supabase Edge Function
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            systemMessage,
            ...formattedHistory,
            { role: 'user', content: message }
          ],
          founder: {
            id: founder.id,
            name: founder.name,
            companyName: founder.companyName,
            stage: founder.stage,
            arr: founder.arr,
            resources: founder.resources,
            metrics: founder.metrics
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  }
};
