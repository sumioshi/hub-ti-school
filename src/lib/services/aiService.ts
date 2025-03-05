import { AIModelConfig, AIRequestPayload } from '../types/ai';

const AI_MODELS: Record<string, AIModelConfig> = {
  'gpt4': {
    id: 'gpt4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4-turbo-preview',
    maxTokens: 4096,
    color: 'from-green-500 to-emerald-600'
  },
  'claude': {
    id: 'claude',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-opus-20240229',
    maxTokens: 4096,
    color: 'from-purple-500 to-violet-600'
  },
  'grok': {
    id: 'grok',
    name: 'Grok-1',
    provider: 'xAI',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'grok-1',
    maxTokens: 4096,
    color: 'from-red-500 to-orange-600'
  },
  'openrouter': {
    id: 'openrouter',
    name: 'OpenRouter Universal',
    provider: 'OpenRouter',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'openai/gpt-4-turbo',
    maxTokens: 4096,
    color: 'from-blue-500 to-cyan-600'
  },
  'local': {
    id: 'local',
    name: 'Local LLM',
    provider: 'Local',
    endpoint: 'http://localhost:11434/api/generate',
    model: 'llama3',
    maxTokens: 4096,
    color: 'from-amber-500 to-yellow-600'
  }
};

// Format the request based on the model's requirements
const formatRequestByModel = (modelId: string, prompt: string): AIRequestPayload => {
  switch (modelId) {
    case 'gpt4':
      return {
        model: AI_MODELS[modelId].model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_MODELS[modelId].maxTokens,
        temperature: 0.7
      };
    case 'claude':
      return {
        model: AI_MODELS[modelId].model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_MODELS[modelId].maxTokens,
        temperature: 0.7
      };
    case 'grok':
      return {
        model: AI_MODELS[modelId].model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_MODELS[modelId].maxTokens,
        temperature: 0.7
      };
    case 'openrouter':
      return {
        model: AI_MODELS[modelId].model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: AI_MODELS[modelId].maxTokens,
        temperature: 0.7,
        transforms: ['middle-out'] // OpenRouter specific
      };
    case 'local':
      return {
        model: AI_MODELS[modelId].model,
        prompt: prompt,
        max_tokens: AI_MODELS[modelId].maxTokens,
        temperature: 0.7
      };
    default:
      return {
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 0.7
      };
  }
};

// Parse the response based on the model
const parseResponseByModel = (modelId: string, response: Record<string, unknown>): string => {
  switch (modelId) {
    case 'gpt4': {
      const typedResponse = response as { choices: Array<{ message: { content: string } }> };
      return typedResponse.choices[0].message.content;
    }
    case 'claude': {
      const typedResponse = response as { content: Array<{ text: string }> };
      return typedResponse.content[0].text;
    }
    case 'grok': {
      const typedResponse = response as { choices: Array<{ message: { content: string } }> };
      return typedResponse.choices[0].message.content;
    }
    case 'openrouter': {
      const typedResponse = response as { choices: Array<{ message: { content: string } }> };
      return typedResponse.choices[0].message.content;
    }
    case 'local':
      return response.response;
    default:
      return response.choices[0].message.content;
  }
};

// The main function to call the AI API
export const callAI = async (
  modelId: string, 
  prompt: string, 
  apiKey: string
): Promise<string> => {
  try {
    if (!AI_MODELS[modelId]) {
      throw new Error(`Modelo ${modelId} não encontrado`);
    }

    const modelConfig = AI_MODELS[modelId];
    const requestData = formatRequestByModel(modelId, prompt);

    // Different headers for different APIs
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    switch (modelId) {
      case 'gpt4':
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;
      case 'claude':
        headers['x-api-key'] = apiKey;
        headers['anthropic-version'] = '2023-06-01';
        break;
      case 'grok':
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;
      case 'openrouter':
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;
      case 'local':
        // Local models might not need authentication
        break;
    }

    const response = await fetch(modelConfig.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro de API (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return parseResponseByModel(modelId, data);
  } catch (error) {
    console.error('Erro ao chamar o serviço de IA:', error);
    throw error;
  }
};

// Get all available models
export const getAvailableModels = () => {
  return Object.values(AI_MODELS);
};

// Test API connection
export const testAPIConnection = async (modelId: string, apiKey: string): Promise<boolean> => {
  try {
    // Use a simple prompt just to test the connection
    const response = await callAI(modelId, 'Responda apenas com a palavra "OK" para testar a conexão.', apiKey);
    return response.includes('OK');
  } catch (error) {
    console.error('Teste de conexão com a API falhou:', error);
    return false;
  }
}; 