
import { supabase } from "@/integrations/supabase/client";
import { Founder } from "@/data/types";
import { toast } from "@/hooks/use-toast";

export type MessageInput = {
  role: 'user' | 'ai';
  content: string;
};

export class OpenAIService {
  private addContextToPrompt(prompt: string, founder: Founder, previousMessages: MessageInput[]): string {
    // Create a detailed context string that includes founder-specific information
    const context = `
Founder: ${founder.name}
Company: ${founder.companyName}
ARR: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)}
Stage: ${founder.stage}
Resources available:
- Email threads: ${founder.resources.emailThreads}
- Call recordings: ${founder.resources.callRecordings}
- Meeting notes: ${founder.resources.meetingNotes}
Key metrics:
- Customer count: ${founder.metrics.customerCount}
- Growth rate: ${(founder.metrics.growthRate * 100).toFixed(1)}%
- Churn rate: ${(founder.metrics.churnRate * 100).toFixed(1)}%
Milestones: ${founder.milestones.map(m => `${m.title} (${m.completed ? 'Completed' : 'Pending'})`).join(', ')}
    `;
    
    // Combine the context with the prompt
    const enhancedPrompt = `${context}\n\nUser question: ${prompt}\n\nWhen you reference documents in your responses, wrap the reference in <span class="reference-tag">reference name</span> format.`;
    return enhancedPrompt;
  }
  
  async sendMessage(prompt: string, founder: Founder, previousMessages: MessageInput[] = []): Promise<string> {
    try {
      console.log('OpenAI Service - Starting API call');
      console.log('OpenAI Service - Supabase URL:', 'https://sokgjnkfazxhjqatfetk.supabase.co');
      console.log('OpenAI Service - Function URL will be:', 'https://sokgjnkfazxhjqatfetk.supabase.co/functions/v1/openai');
      console.log('OpenAI Service - Sending message to OpenAI API:', { 
        prompt: prompt.substring(0, 100) + '...', 
        founder: founder.name, 
        messagesCount: previousMessages.length 
      });
      
      // Prepare a simplified version of founder data to reduce payload size
      const simplifiedFounder = {
        name: founder.name,
        companyName: founder.companyName,
        arr: founder.arr,
        stage: founder.stage,
        resources: founder.resources,
        metrics: founder.metrics,
        milestones: founder.milestones.map(m => ({
          title: m.title,
          completed: m.completed
        }))
      };
      
      // Simplify previous messages to reduce payload size
      const simplifiedMessages = previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      const requestBody = { 
        prompt: prompt,
        founder: simplifiedFounder,
        previousMessages: simplifiedMessages
      };
      
      console.log('OpenAI Service - Request body prepared, calling Supabase function...');
      console.log('OpenAI Service - Request body size:', JSON.stringify(requestBody).length, 'characters');
      
      // Call our Supabase Edge Function that interfaces with OpenAI
      const { data, error } = await supabase.functions.invoke('openai', {
        body: requestBody
      });
      
      console.log('OpenAI Service - Supabase function response received');
      console.log('OpenAI Service - Response data:', data);
      console.log('OpenAI Service - Response error:', error);
      
      if (error) {
        console.error('OpenAI Service - Supabase function error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Supabase function error: ${error.message} (Code: ${error.code})`);
      }
      
      if (!data) {
        console.error('OpenAI Service - No data received from Supabase function');
        throw new Error('No response data received from the AI service');
      }
      
      if (!data.response) {
        console.error('OpenAI Service - Invalid response format from OpenAI API:', data);
        throw new Error(`Invalid response format from the AI service. Received: ${JSON.stringify(data)}`);
      }
      
      console.log('OpenAI Service - Successfully received response from OpenAI API');
      return data.response;
    } catch (error) {
      console.error('OpenAI Service - Error in OpenAI service:', error);
      console.error('OpenAI Service - Error type:', typeof error);
      console.error('OpenAI Service - Error constructor:', error?.constructor?.name);
      
      let errorMessage = 'Failed to get a response from AI. Please try again.';
      
      if (error instanceof Error) {
        console.error('OpenAI Service - Error message:', error.message);
        console.error('OpenAI Service - Error stack:', error.stack);
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      console.error('OpenAI Service - Final error message:', errorMessage);
      
      toast({
        title: 'Connection Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    }
  }
}

export const openaiService = new OpenAIService();
