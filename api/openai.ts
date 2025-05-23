
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  try {
    // Get OpenAI API key from environment variables
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }
    
    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });
    const openai = new OpenAIApi(configuration);
    
    // Parse request body
    const { prompt, founder, previousMessages } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    // Format messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an AI assistant with access to VC data. You help venture capitalists by providing insights about their portfolio companies.
When you reference specific documents or resources, wrap them in <span class="reference-tag">document name</span> tags.
For example: Based on <span class="reference-tag">email thread from Jan 15-19</span>, the founder is considering...`
      },
      ...(previousMessages || []).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: `
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
    
User question: ${prompt}

When you reference documents in your responses, wrap the reference in <span class="reference-tag">reference name</span> format.`
      }
    ];
    
    // Call OpenAI API with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      
      // Return the response
      return new Response(
        JSON.stringify({ 
          response: response.data.choices[0]?.message?.content || 'No response from AI' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (apiError) {
      clearTimeout(timeoutId);
      throw apiError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        stack: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
