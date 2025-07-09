import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PitchDeckRequest {
  companyName: string;
  industry: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  fundingAmount: string;
  useOfFunds: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) throw new Error("User not authenticated");
    
    const user = userData.user;

    // Check if user has paid subscription
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("subscription_tier")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.subscription_tier !== "pro" && profile.subscription_tier !== "enterprise")) {
      return new Response(JSON.stringify({ error: "This feature is only available for Pro and Enterprise users" }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pitchData: PitchDeckRequest = await req.json();

    const prompt = `Create a comprehensive pitch deck for the following startup:

Company: ${pitchData.companyName}
Industry: ${pitchData.industry}
Problem: ${pitchData.problem}
Solution: ${pitchData.solution}
Target Market: ${pitchData.targetMarket}
Business Model: ${pitchData.businessModel}
Funding Amount: ${pitchData.fundingAmount}
Use of Funds: ${pitchData.useOfFunds}

Generate a professional pitch deck with the following slides:
1. Title Slide (Company name and tagline)
2. Problem Statement
3. Solution Overview
4. Market Opportunity
5. Business Model
6. Product/Service Details
7. Traction & Metrics (create realistic projections)
8. Competition Analysis
9. Marketing Strategy
10. Team (suggest key roles needed)
11. Financial Projections (3-year outlook)
12. Funding Ask & Use of Funds
13. Thank You & Contact

For each slide, provide:
- A compelling headline
- 3-4 bullet points of key content
- Suggested visuals or charts
- Speaker notes

Make it investor-ready, compelling, and professional. Focus on storytelling and clear value proposition.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert startup advisor and pitch deck specialist. Create professional, investor-ready pitch decks with compelling storytelling and clear value propositions.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Save to database
    const { error: insertError } = await supabaseClient
      .from("pitch_decks")
      .insert({
        user_id: user.id,
        company_name: pitchData.companyName,
        industry: pitchData.industry,
        problem: pitchData.problem,
        solution: pitchData.solution,
        target_market: pitchData.targetMarket,
        business_model: pitchData.businessModel,
        funding_amount: pitchData.fundingAmount,
        use_of_funds: pitchData.useOfFunds,
        generated_content: generatedContent,
      });

    if (insertError) {
      console.error("Error saving pitch deck:", insertError);
    }

    return new Response(JSON.stringify({ generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-pitch-deck function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});