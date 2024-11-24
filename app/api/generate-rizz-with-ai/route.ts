import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Get parameters from request body
    const { prompt, style } = await req.json();

    // Validate required parameters
    if (!prompt) {
      return NextResponse.json(
        { error: 'Please provide a scenario description' },
        { status: 400 }
      );
    }

    // Construct AI prompt
    const aiPrompt = `Generate a charming and flirty message based on the following:
    Scenario: ${prompt}
    Style: ${style || 'witty and humorous'}
    Please ensure the response is concise, engaging, and creative.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: aiPrompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 100,
    });

    // Get the generated response
    const generatedRizz = completion.choices[0].message.content;

    // Return result
    return NextResponse.json({ 
      rizz: generatedRizz 
    });

  } catch (error) {
    console.error('Error generating flirty message:', error);
    return NextResponse.json(
      { error: 'Error generating message' },
      { status: 500 }
    );
  }
}