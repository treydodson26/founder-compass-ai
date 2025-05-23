
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
      // Enhance the prompt with founder context
      const enhancedPrompt = this.addContextToPrompt(prompt, founder, previousMessages);
      
      // Format messages for the OpenAI API
      const formattedMessages = [
        {
          role: 'system',
          content: `You are an AI assistant with access to VC data. You help venture capitalists by providing insights about their portfolio companies.
When you reference specific documents or resources, wrap them in <span class="reference-tag">document name</span> tags.
For example: Based on <span class="reference-tag">email thread from Jan 15-19</span>, the founder is considering...`
        },
        ...previousMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: enhancedPrompt
        }
      ];
      
      // Call our Supabase Edge Function that interfaces with OpenAI
      const { data, error } = await supabase.functions.invoke('openai', {
        body: { messages: formattedMessages }
      });
      
      if (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('Failed to get a response from AI');
      }
      
      return data.response;
    } catch (error) {
      console.error('Error in OpenAI service:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from AI. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();
