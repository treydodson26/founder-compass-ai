
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import OpenAI from 'https://esm.sh/openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Edge function received request");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  try {
    // Get OpenAI API key from environment variables
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error("OpenAI API key not found in environment variables");
      throw new Error('OpenAI API key not found in environment variables');
    }
    
    console.log("OpenAI API Key found, initializing OpenAI");
    
    // Initialize OpenAI with v4 SDK
    const openai = new OpenAI({
      apiKey: openAIApiKey,
    });
    
    // Parse request body
    const requestData = await req.json();
    const { prompt, founder, previousMessages } = requestData;
    
    console.log(`Processing request for founder: ${founder?.name}, message count: ${previousMessages?.length || 0}`);
    
    if (!prompt) {
      console.error("Missing prompt in request");
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
    
    console.log("Sending request to OpenAI API");
    
    // Call OpenAI API with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      // Using the v4 SDK syntax
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o', // Using gpt-4o model as per your requirements
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      console.log("Received response from OpenAI API");
      
      // Return the response
      return new Response(
        JSON.stringify({ 
          response: completion.choices[0]?.message?.content || 'No response from AI' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } catch (apiError) {
      clearTimeout(timeoutId);
      console.error("OpenAI API error:", apiError.message);
      throw apiError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('Error:', error.message);
    
    // Don't expose stack traces in production
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        message: error.message || 'Internal server error'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
