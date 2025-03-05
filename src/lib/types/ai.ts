export interface AIModelConfig {
  id: string;
  name: string;
  provider: string;
  endpoint: string;
  model: string;
  maxTokens: number;
  color: string;
}

export interface AIRequestPayload {
  model: string;
  messages?: Array<{role: string, content: string}>;
  prompt?: string;
  max_tokens: number;
  temperature: number;
  transforms?: string[];
  [key: string]: string | number | boolean | object | undefined;
}

export interface AIResponsePayload {
  content: string;
  // Pode adicionar mais campos conforme necessário
}

export interface UserAPIKeys {
  openai?: string;
  anthropic?: string;
  xai?: string;
  openrouter?: string;
  [key: string]: string | undefined;
} 