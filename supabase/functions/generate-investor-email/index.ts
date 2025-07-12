import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvestorEmailRequest {
  investorName?: string;
  companyName: string;
  pitchSummary: string;
  fundingAmount: string;
  useOfFunds: string;
  contactInfo: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request for investor email generation');
    
    // Check if Gemini API key is available
    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Gemini API key not configured. Please contact administrator." }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
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

    if (!profile || (profile.subscription_tier === "free")) {
      return new Response(JSON.stringify({ error: "This feature is only available for Starter, Pro and Enterprise users" }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailData: InvestorEmailRequest = await req.json();

    const prompt = `Write a professional, compelling investor outreach email with the following details:

Investor Name: ${emailData.investorName || 'Dear Investor'}
Company Name: ${emailData.companyName}
Pitch Summary: ${emailData.pitchSummary}
Funding Amount: ${emailData.fundingAmount}
Use of Funds: ${emailData.useOfFunds}
Contact Information: ${emailData.contactInfo}

Create an email that:
1. Has a compelling subject line
2. Opens with a personalized greeting
3. Quickly establishes credibility and relevance
4. Presents the opportunity concisely
5. Highlights key metrics and traction (create realistic examples if not provided)
6. Shows clear market opportunity
7. Makes a specific ask
8. Includes a professional closing
9. Is not overly salesy but confident and professional
10. Is the right length (not too long, not too short)

The email should feel personal, professional, and make the investor want to learn more. Include specific details that make it feel authentic and well-researched.

Format the response as:
Subject: [subject line]

[email body]

Best regards,
[signature block]`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert fundraising advisor who writes compelling investor outreach emails. Create professional, personalized emails that get responses and meetings.\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${response.statusText}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data, null, 2));
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    const generatedContent = data.candidates[0].content.parts[0].text;

    // Save to database
    const { error: insertError } = await supabaseClient
      .from("investor_emails")
      .insert({
        user_id: user.id,
        investor_name: emailData.investorName,
        company_name: emailData.companyName,
        pitch_summary: emailData.pitchSummary,
        funding_amount: emailData.fundingAmount,
        use_of_funds: emailData.useOfFunds,
        contact_info: emailData.contactInfo,
        generated_content: generatedContent,
      });

    if (insertError) {
      console.error("Error saving investor email:", insertError);
    }

    return new Response(JSON.stringify({ generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-investor-email function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});