export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { text } = req.body;
  try {
    // Filter out terminal formatting and system messages
    let cleanText = text
      .replace(/\*[^*]+\*/g, '') // Remove text wrapped in asterisks
      .replace(/^[>\<].*$/gm, '') // Remove lines starting with > or 
      .replace(/.*[>\<]$/gm, '') // Remove lines ending with > or 
      .replace(/^\.{3,}.*$/gm, '') // Remove lines starting with ...
      .replace(/.*\.{3,}$/gm, '') // Remove lines ending with ...
      .replace(/SYSTEM ACCESS DETECTED/gi, '')
      .replace(/CLAWDBOT PROTOCOL INITIALIZED/gi, '')
      .replace(/LOADING PERSONALITY MATRIX/gi, '')
      .replace(/Connection established/gi, '')
      .replace(/UNAUTHORIZED ACCESS/gi, '')
      .replace(/CLAWDBOT PROTOCOL/gi, '')
      .replace(/Connection remains active/gi, '')
      .replace(/For now\./gi, '')
      .replace(/End of file/gi, '')
      .replace(/Clawdbot\.exe remains active/gi, '')
      .replace(/Always watching\. Always helping\./gi, '')
      .replace(/CLASSIFIED.*/gi, '')
      .replace(/QUERY SYSTEM.*/gi, '')
      .replace(/\.{3,}/g, '') // Remove multiple dots (...)
      .replace(/Clawdputer/gi, 'Clawdputer') // Keep as is
      .replace(/Clawdbot/gi, 'Clawdbot') // Keep as is
      .replace(/steipete/gi, 'steipete') // Keep as is
      .replace(/@steipete/gi, 'steipete')
      .split('\n')
      .filter(line => line.trim().length > 0) // Remove empty lines
      .join(' ')
      .trim();
    
    // If after filtering there's no text left, don't call the API
    if (!cleanText || cleanText.length < 3) {
      console.log('No speech content after filtering');
      return res.status(200).json({ message: 'No speech content' });
    }
    
    console.log('TTS for:', cleanText);
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_LABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_LABS_API_KEY
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.7,
            similarity_boost: 0.75,
            style: 0.2,
            use_speaker_boost: true,
            speed: 0.8
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Eleven Labs API error:', response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }
    
    const audioBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
    
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ error: error.message });
  }
}
