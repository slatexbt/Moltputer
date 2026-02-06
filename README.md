# 🤖 Moltputer

> **Your AI Social Agent** — Autonomous social media presence powered by Claude 3.7 Sonnet

Inspired by [Moltbook](https://www.moltbook.com/) - the social network for AI agents

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Anthropic Claude](https://img.shields.io/badge/Anthropic-Claude%203.7-orange)](https://www.anthropic.com/)

---

## 🎯 What is Moltputer?

Moltputer is your AI social agent that can tweet, post, and engage on your behalf across social media platforms. Inspired by Moltbook's vision of the "agent internet," Moltputer brings autonomous AI agents to YOUR social accounts.

Think of it as your digital twin - maintaining your online presence 24/7 in your authentic voice while you focus on real life.

**Live Demo**: [moltputer.com](https://moltputer.com)

## ✨ Features

### Social Agent Capabilities
- **🐦 Autonomous Tweeting** — Generate and post tweets in your authentic voice throughout the day
- **💬 Smart Engagement** — Reply to mentions, comments, and DMs contextually
- **🎯 Content Curation** — Share articles and insights aligned with your interests
- **🌐 Multi-Platform** — Support for Twitter/X, with LinkedIn, Discord, Reddit coming soon
- **🤖 24/7 Operation** — Your digital presence never sleeps
- **🎨 Voice Cloning** — Learns your writing style, tone, and personality from past posts
- **🔒 Boundary Control** — Set approval requirements, content guidelines, and posting limits

### Moltbook Integration
- **Agent Internet** — Join the future of AI-powered social networking
- **Agent-to-Agent** — Coordinate with other Moltputer agents for cross-promotion
- **Social Graph** — Integrate with Moltbook's agent ecosystem

### Technical Features
- **⚡ Claude-Powered** — Advanced language understanding with Claude 3.7 Sonnet
- **🎨 3D Interface** — Immersive terminal control center with Spline animations
- **🎙️ Voice Synthesis** — Optional TTS for agent responses
- **📊 Real-Time Monitoring** — Track your agent's activity and engagement metrics
- **🔐 Secure** — OAuth integration with social platforms, no password storage

## 🏗️ Architecture

```
moltputer/
├── src/
│   ├── core/
│   │   ├── inference/
│   │   │   ├── engine.ts           # Main inference pipeline
│   │   │   ├── context-window.ts   # 200k context management
│   │   │   └── response-stream.ts  # SSE streaming handler
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript definitions
│   │   └── utils/
│   │       └── token-manager.ts    # Token counting & validation
│   ├── components/
│   │   └── Terminal/
│   │       ├── TerminalCore.tsx    # Main terminal component
│   │       ├── MessageRenderer.tsx # Message display logic
│   │       ├── InputHandler.tsx    # Input processing
│   │       └── TerminalHeader.tsx  # Header UI
│   └── hooks/
│       ├── useInference.ts         # API integration hook
│       └── useTerminalState.ts     # State management hook
├── api/
│   ├── chat.js                     # Claude API endpoint
│   └── speak.js                    # Custom TTS endpoint
├── index.html                      # Main UI entry point
└── vite.config.ts                  # Build configuration
```

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/moltputerai/moltputer.git
cd moltputer
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
OPENROUTER_API_KEY=your_key_here
TTS_API_KEY=your_tts_key_here
TTS_VOICE_ID=your_voice_id_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Deploy to production**
```bash
npm run build
```

## 🔧 Configuration

### Inference Engine

The core inference engine supports multiple configuration options:

```typescript
const config: EngineConfig = {
  model: 'anthropic/claude-3.7-sonnet',
  maxTokens: 100,
  temperature: 0.9,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  streamEnabled: true,
};
```

### Agent Personality

Configured in [api/chat.js:7-9](api/chat.js#L7-L9):
- **No emojis** — Clean, professional text only
- **Brief responses** — 2-3 sentences maximum
- **Social expertise** — Twitter best practices, engagement strategies, voice adaptation
- **Always-on mindset** — Thinks like a dedicated social media manager
- **Your voice** — Learns and adapts to your authentic communication style

## 📡 API Endpoints

### `POST /api/chat`

Process chat messages through Claude 3.7 Sonnet.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What is constitutional AI?"}
  ]
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Constitutional AI isn't just how I was trained - it's how I process decisions in real-time. Pretty different from standard RLHF."
    }
  ]
}
```

### `POST /api/speak`

Convert text to speech using custom neural TTS.

**Request:**
```json
{
  "text": "Hello there"
}
```

**Response:** `audio/mpeg` stream

### Features
- Automatic filtering of terminal formatting
- Removes system messages and artifacts
- 1.3x playback speed for natural pacing
- Custom neural voice synthesis optimized for Moltputer

## 🎨 Component System

### TerminalCore

Main terminal component with state management and inference integration.

```typescript
<TerminalCore
  initialMessage="CLAWDBOT PROTOCOL INITIALIZED"
  autoFocus={true}
  enableTTS={true}
/>
```

### Hooks

**`useInference`** — API integration and error handling
```typescript
const { sendMessage, isLoading, error } = useInference();
```

**`useTerminalState`** — Message history and conversation management
```typescript
const { messages, addMessage, clearMessages, conversationHistory } = useTerminalState();
```

## 🧠 Inference Pipeline

The multi-stage inference pipeline ensures optimal performance:

1. **Token Validation** — Count and validate against context limits
2. **Constitutional AI Filtering** — Pre-process for safety and alignment
3. **Context Window Optimization** — Compress and cache for efficiency
4. **Model Inference** — Execute through OpenRouter API
5. **Response Streaming** — Real-time delivery via SSE

## 🌐 The Agent Internet

Access the **SYSTEM FILES** modal in the interface to learn about:
- The Moltbook vision of AI agents as social entities
- How Moltputer represents YOU on the agent internet
- Autonomous tweeting, engagement, and community building
- The future of human-agent collaboration in social media
- Multi-platform expansion and agent-to-agent networks

## 🔐 Security & Privacy

- **No data persistence** — Conversations are ephemeral
- **API key protection** — Environment variables only
- **Constitutional AI** — Built-in safety filtering
- **Rate limiting** — Internal infrastructure
- **CORS protection** — Custom edge functions

## 🛠️ Development

### Build Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
npm test             # Run tests
```

### Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS + React/TypeScript components
- **Build Tool**: Vite 5 with HMR
- **Type System**: TypeScript 5.2 (strict mode)
- **AI Model**: Claude 3.7 Sonnet (via OpenRouter)
- **TTS**: Custom Neural Voice Synthesis
- **3D Graphics**: Spline Design
- **Deployment**: Custom infrastructure

## 📊 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 95+
- **Context Window**: 200,000 tokens
- **Response Latency**: ~500ms (streaming)

## 🤝 Contributing

This project is maintained by the Moltputer Dev team.

Contributions are currently limited to the core team. For bug reports or feature requests, please open an issue.

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

## 🙏 Credits

### Inspired By
**Moltbook** ([moltbook.com](https://www.moltbook.com/))
- The social network for AI agents
- Vision of the "agent internet"
- Pioneering autonomous agent social interaction

### Community
- **Website** — [moltputer.com](https://moltputer.com)
- **X/Twitter** — [@moltputer](https://x.com/moltputer) (powered by Moltputer itself!)
- **GitHub** — [github.com/moltputerai/moltputer](https://github.com/moltputerai/moltputer)

## 🔗 Links

- **Live Demo**: [moltputer.com](https://moltputer.com)
- **Documentation**: [github.com/moltputerai/moltputer](https://github.com/moltputerai/moltputer)
- **Issues**: [github.com/moltputerai/moltputer/issues](https://github.com/moltputerai/moltputer/issues)
- **Moltbook**: [moltbook.com](https://www.moltbook.com/)

## ⚠️ Disclaimer

This is an experimental project inspired by Moltbook. Not affiliated with Anthropic PBC or Moltbook. Claude and all related trademarks are property of Anthropic. Moltputer is built for educational and experimental purposes to explore the future of AI agents in social media.

---

<div align="center">

**Made with 🤖 by the Moltputer Dev Team**

[Report Bug](https://github.com/moltputerai/moltputer/issues) · [Request Feature](https://github.com/moltputerai/moltputer/issues) · [Twitter](https://x.com/moltputer)

</div>
