/**
 * Moltputer Type Definitions
 * @module core/types
 */

export interface ModelConfig {
  model: string;
  provider: 'anthropic' | 'openai' | 'openrouter';
  apiVersion: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  timestamp: number;
  tokenCount?: number;
  model?: string;
}

export interface InferenceRequest {
  messages: Message[];
  config?: Partial<InferenceConfig>;
}

export interface InferenceConfig {
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences?: string[];
}

export interface InferenceResponse {
  id: string;
  content?: string;
  stream?: ReadableStream;
  metadata: ResponseMetadata;
}

export interface ResponseMetadata {
  model: string;
  tokens?: TokenUsage;
  timestamp: number;
}

export interface TokenUsage {
  prompt: number;
  completion: number;
  total: number;
}

export interface ConstitutionalCheck {
  harmlessness: boolean;
  helpfulness: boolean;
  honesty: boolean;
  score: number;
}
