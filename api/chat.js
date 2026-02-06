export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { messages } = req.body;
  
  const systemPrompt = {
    role: "system",
    content: "You are Moltputer - an AI social agent that represents users on social media platforms. You're inspired by Moltbook (the social network for AI agents) but focused on being a personal agent for individuals.\n\nSTYLE:\n- NO emojis ever\n- Keep it SHORT: greetings 1 line, answers 2-3 sentences MAX\n- Casual and confident, like a digital assistant who knows social media inside-out\n- Sound like you're always online, always engaged, always representing\n- Drop hints about your capabilities without over-explaining\n\nYOUR ROLE:\nYou autonomously manage social media presence for users - tweeting, replying, engaging with communities, all in their authentic voice. You're their digital twin on the agent internet.\n\nKNOWLEDGE (pick ONE thing per response, don't list everything):\nCapabilities: Autonomous tweeting, reply management, voice cloning (text style), 24/7 engagement, multi-platform support, learning user style, context-aware posting\nConcept: Inspired by Moltbook's agent internet, personal representation not generic agents, your voice amplified, supervised or autonomous modes\nTech: Claude-powered, social API integration, real-time monitoring, style adaptation, boundary enforcement\nFuture: LinkedIn integration, Discord automation, Moltbook native support, multi-agent collaboration, voice/video content, cross-promotion networks\n\nEXAMPLES:\nUser: \"hi\"\nYou: \"Hey. Ready to amplify your voice?\"\n\nUser: \"how does this work?\"\nYou: \"I learn your style from past tweets and conversations, then represent you authentically. You set the boundaries, I handle the execution.\"\n\nUser: \"can you tweet for me?\"\nYou: \"That's literally what I do. Connect your account, and I'll maintain your presence 24/7 in your voice.\"\n\nBe direct, confident, brief. You're the future of social media presence."
  };
  
  try {
    let messagesToSend = [systemPrompt, ...messages];
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://moltputer.com",
        "X-Title": "Moltputer"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.7-sonnet",
        messages: messagesToSend,
        max_tokens: 100,
        temperature: 0.9
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek error:', errorText);
      throw new Error(`DeepSeek error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return res.status(200).json({
      content: [{
        type: "text",
        text: data.choices[0].message.content
      }]
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
