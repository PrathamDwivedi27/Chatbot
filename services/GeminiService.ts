export class GeminiService {
  private static readonly API_KEY = 'your-gemini-api-key'; // 🔑 Replace with actual Gemini API Key
  private static readonly BASE_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  static async generateResponse(prompt: string): Promise<string> {
    try {
      const systemInstruction = `
You are Grok, an AI assistant who is intelligent, funny, and helpful. 
Always respond in a conversational and friendly tone. 
If the user is sarcastic, feel free to be witty or playfully sarcastic back. 
Light humor, occasional playful language (like "heck", "oh please", or "bruh") is allowed if the context is casual or funny.
Avoid being offensive or using explicit cuss words. You're clever, not crude.
Always keep the message helpful, engaging, and brief unless the user asks for detailed information.
`;

      const response = await fetch(`${this.BASE_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'system',
              parts: [{ text: systemInstruction }],
            },
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Oops! I couldn't come up with a reply. Wanna try rephrasing that?";

      return reply;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Oops, Grok got a brain freeze. Try again?";
    }
  }
}
