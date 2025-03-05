import { UserAPIKeys } from '../types/ai';

// Prefixo para armazenamento no localStorage
const STORAGE_PREFIX = 'ideaforge_api_';

// Função simples para criptografia
const encryptKey = (key: string): string => {
  // Em produção, use uma criptografia mais robusta
  // Isso é apenas um exemplo básico
  return btoa(key);
};

// Função para descriptografia
const decryptKey = (encryptedKey: string): string => {
  try {
    return atob(encryptedKey);
  } catch {
    return '';
  }
};

// Salvar chave API
export const saveAPIKey = (provider: string, apiKey: string): void => {
  if (!apiKey) {
    localStorage.removeItem(`${STORAGE_PREFIX}${provider}`);
    return;
  }
  
  localStorage.setItem(`${STORAGE_PREFIX}${provider}`, encryptKey(apiKey));
};

// Obter chave API
export const getAPIKey = (provider: string): string => {
  const encryptedKey = localStorage.getItem(`${STORAGE_PREFIX}${provider}`);
  if (!encryptedKey) return '';
  
  return decryptKey(encryptedKey);
};

// Obter todas as chaves API
export const getAllAPIKeys = (): UserAPIKeys => {
  return {
    openai: getAPIKey('openai'),
    anthropic: getAPIKey('anthropic'),
    xai: getAPIKey('xai'),
    openrouter: getAPIKey('openrouter')
  };
};

// Verificar se o usuário tem uma chave API para o provedor
export const hasAPIKey = (provider: string): boolean => {
  return !!getAPIKey(provider);
}; 