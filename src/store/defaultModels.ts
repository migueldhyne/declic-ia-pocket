import {Model, ModelOrigin, ModelType} from '../utils/types';
import {chatTemplates} from '../utils/chat';
import {defaultCompletionParams} from '../utils/completionSettingsVersions';
import {Platform} from 'react-native';

export const MODEL_LIST_VERSION = 15;

const iosOnlyModels: Model[] = [];
const androidOnlyModels: Model[] = [];

const crossPlatformModels: Model[] = [

  // ════════════════════════════════════════════
  // 🪶 TRÈS LÉGERS — moins de 2 GB
  // ════════════════════════════════════════════

  // -------- SmolLM3 — HuggingFace Paris 🇫🇷 --------
  {
    id: 'bartowski/SmolLM2-1.7B-Instruct-GGUF/SmolLM2-1.7B-Instruct-Q8_0.gguf',
    author: 'bartowski',
    repo: 'SmolLM2-1.7B-Instruct-GGUF',
    name: 'SmolLM2 1.7B (Q8_0)',
    type: 'SmolLM',
    country: '🇫🇷',
    minRamGB: 2,
    capabilities: ['instructions', 'summarization'],
    size: 1820414944,
    params: 1711376384,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF',
    progress: 0,
    filename: 'SmolLM2-1.7B-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: chatTemplates.smolLM,
    chatTemplate: chatTemplates.smolLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>'],
    stopWords: ['<|endoftext|>', '<|im_end|>'],
    supportsThinking: false,
    hfModelFile: {
      rfilename: 'SmolLM2-1.7B-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/bartowski/SmolLM2-1.7B-Instruct-GGUF/resolve/main/SmolLM2-1.7B-Instruct-Q8_0.gguf',
      size: 1820414944,
      oid: 'c06316819523138df0346459118248997dac5089',
      lfs: {
        oid: '0c6e8955788b1253f418c354a4bdc4cf507b8cfe49c48bb10c7c58ae713cfa2a',
        size: 1820414944,
        pointerSize: 135,
      },
      canFitInStorage: true,
    },
  },

  // -------- Qwen3 1.7B — Alibaba 🇨🇳 (multilingue, bon en français) --------
  {
    id: 'bartowski/Qwen3-1.7B-GGUF/Qwen3-1.7B-Q8_0.gguf',
    author: 'bartowski',
    repo: 'Qwen3-1.7B-GGUF',
    name: 'Qwen3 1.7B (Q8_0)',
    type: 'Qwen',
    country: '🌍',
    minRamGB: 2,
    capabilities: ['instructions', 'reasoning', 'multilingual'],
    size: 1890000000,
    params: 1777088000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Qwen3-1.7B-GGUF/resolve/main/Qwen3-1.7B-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Qwen3-1.7B-GGUF',
    progress: 0,
    filename: 'Qwen3-1.7B-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.qwen25},
    chatTemplate: chatTemplates.qwen25,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.6,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.6,
    },
    defaultStopWords: ['<|im_end|>'],
    stopWords: ['<|im_end|>'],
    supportsThinking: true,
    hfModelFile: {
      rfilename: 'Qwen3-1.7B-Q8_0.gguf',
      url: 'https://huggingface.co/bartowski/Qwen3-1.7B-GGUF/resolve/main/Qwen3-1.7B-Q8_0.gguf',
      size: 1890000000,
      canFitInStorage: true,
    },
  },

  // -------- Gemma 3 1B — Google DeepMind 🇬🇧 --------
  {
    id: 'bartowski/gemma-3-1b-it-GGUF/gemma-3-1b-it-Q8_0.gguf',
    author: 'bartowski',
    repo: 'gemma-3-1b-it-GGUF',
    name: 'Gemma 3 1B (Q8_0)',
    type: 'Gemma',
    country: '🇬🇧',
    minRamGB: 2,
    capabilities: ['instructions', 'summarization', 'multilingual'],
    size: 1100000000,
    params: 1000000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/gemma-3-1b-it-GGUF/resolve/main/gemma-3-1b-it-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/bartowski/gemma-3-1b-it-GGUF',
    progress: 0,
    filename: 'gemma-3-1b-it-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.gemmaIt},
    chatTemplate: chatTemplates.gemmaIt,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<end_of_turn>'],
    stopWords: ['<end_of_turn>'],
    hfModelFile: {
      rfilename: 'gemma-3-1b-it-Q8_0.gguf',
      url: 'https://huggingface.co/bartowski/gemma-3-1b-it-GGUF/resolve/main/gemma-3-1b-it-Q8_0.gguf',
      size: 1100000000,
      canFitInStorage: true,
    },
  },

  // ════════════════════════════════════════════
  // ⚖️ ÉQUILIBRÉS — 2 à 5 GB
  // ════════════════════════════════════════════

  // -------- Mistral 7B Instruct v0.3 — Mistral AI 🇫🇷 --------
  {
    id: 'bartowski/Mistral-7B-Instruct-v0.3-GGUF/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'Mistral-7B-Instruct-v0.3-GGUF',
    name: 'Mistral 7B Instruct v0.3 (Q4_K_M)',
    type: 'Mistral',
    country: '🇫🇷',
    minRamGB: 5,
    capabilities: ['instructions', 'summarization', 'reasoning', 'multilingual', 'rewriting'],
    size: 4370000000,
    params: 7242000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF',
    progress: 0,
    filename: 'Mistral-7B-Instruct-v0.3-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.default},
    chatTemplate: chatTemplates.default,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.7,
    },
    defaultStopWords: ['</s>', '[INST]', '[/INST]'],
    stopWords: ['</s>', '[INST]', '[/INST]'],
    hfModelFile: {
      rfilename: 'Mistral-7B-Instruct-v0.3-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q4_K_M.gguf',
      size: 4370000000,
      canFitInStorage: true,
    },
  },

  // -------- Gemma 3 4B — Google DeepMind 🇬🇧 --------
  {
    id: 'bartowski/gemma-3-4b-it-GGUF/gemma-3-4b-it-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'gemma-3-4b-it-GGUF',
    name: 'Gemma 3 4B (Q4_K_M)',
    type: 'Gemma',
    country: '🇬🇧',
    minRamGB: 4,
    capabilities: ['instructions', 'summarization', 'reasoning', 'multilingual', 'creativity'],
    size: 2600000000,
    params: 4000000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/gemma-3-4b-it-GGUF/resolve/main/gemma-3-4b-it-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/gemma-3-4b-it-GGUF',
    progress: 0,
    filename: 'gemma-3-4b-it-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.gemmaIt},
    chatTemplate: chatTemplates.gemmaIt,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 800,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 800,
      temperature: 0.7,
    },
    defaultStopWords: ['<end_of_turn>'],
    stopWords: ['<end_of_turn>'],
    hfModelFile: {
      rfilename: 'gemma-3-4b-it-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/gemma-3-4b-it-GGUF/resolve/main/gemma-3-4b-it-Q4_K_M.gguf',
      size: 2600000000,
      canFitInStorage: true,
    },
  },

  // -------- Qwen3 4B — Alibaba 🌍 --------
  {
    id: 'bartowski/Qwen3-4B-GGUF/Qwen3-4B-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'Qwen3-4B-GGUF',
    name: 'Qwen3 4B (Q4_K_M)',
    type: 'Qwen',
    country: '🌍',
    minRamGB: 4,
    capabilities: ['instructions', 'reasoning', 'code', 'multilingual'],
    size: 2600000000,
    params: 4000000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Qwen3-4B-GGUF/resolve/main/Qwen3-4B-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Qwen3-4B-GGUF',
    progress: 0,
    filename: 'Qwen3-4B-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.qwen25},
    chatTemplate: chatTemplates.qwen25,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 800,
      temperature: 0.6,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 800,
      temperature: 0.6,
    },
    defaultStopWords: ['<|im_end|>'],
    stopWords: ['<|im_end|>'],
    supportsThinking: true,
    hfModelFile: {
      rfilename: 'Qwen3-4B-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/Qwen3-4B-GGUF/resolve/main/Qwen3-4B-Q4_K_M.gguf',
      size: 2600000000,
      canFitInStorage: true,
    },
  },

  // ════════════════════════════════════════════
  // 💪 PUISSANTS — 6 GB et plus
  // ════════════════════════════════════════════

  // -------- Mistral Nemo 12B — Mistral AI 🇫🇷 --------
  {
    id: 'bartowski/Mistral-Nemo-Instruct-2407-GGUF/Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'Mistral-Nemo-Instruct-2407-GGUF',
    name: 'Mistral Nemo 12B (Q4_K_M)',
    type: 'Mistral',
    country: '🇫🇷',
    minRamGB: 8,
    capabilities: ['instructions', 'summarization', 'reasoning', 'multilingual', 'rewriting', 'creativity'],
    size: 7700000000,
    params: 12248000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF/resolve/main/Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF',
    progress: 0,
    filename: 'Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.default},
    chatTemplate: chatTemplates.default,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 1500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 1500,
      temperature: 0.7,
    },
    defaultStopWords: ['</s>', '[INST]', '[/INST]'],
    stopWords: ['</s>', '[INST]', '[/INST]'],
    hfModelFile: {
      rfilename: 'Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/Mistral-Nemo-Instruct-2407-GGUF/resolve/main/Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
      size: 7700000000,
      canFitInStorage: true,
    },
  },

  // -------- Llama 3.1 8B — Meta 🇺🇸 (référence) --------
  {
    id: 'bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'Meta-Llama-3.1-8B-Instruct-GGUF',
    name: 'Llama 3.1 8B Instruct (Q4_K_M)',
    type: 'Llama',
    country: '🇺🇸',
    minRamGB: 6,
    capabilities: ['instructions', 'summarization', 'reasoning', 'rewriting', 'multilingual'],
    size: 4920000000,
    params: 8030000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF',
    progress: 0,
    filename: 'Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.llama3},
    chatTemplate: chatTemplates.llama3,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.6,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.6,
    },
    defaultStopWords: ['<|eot_id|>'],
    stopWords: ['<|eot_id|>'],
    hfModelFile: {
      rfilename: 'Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/resolve/main/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
      size: 4920000000,
      canFitInStorage: true,
    },
  },

  // -------- Qwen3 8B — Alibaba 🌍 --------
  {
    id: 'bartowski/Qwen3-8B-GGUF/Qwen3-8B-Q4_K_M.gguf',
    author: 'bartowski',
    repo: 'Qwen3-8B-GGUF',
    name: 'Qwen3 8B (Q4_K_M)',
    type: 'Qwen',
    country: '🌍',
    minRamGB: 6,
    capabilities: ['instructions', 'reasoning', 'code', 'math', 'multilingual'],
    size: 5200000000,
    params: 8000000000,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/bartowski/Qwen3-8B-GGUF/resolve/main/Qwen3-8B-Q4_K_M.gguf',
    hfUrl: 'https://huggingface.co/bartowski/Qwen3-8B-GGUF',
    progress: 0,
    filename: 'Qwen3-8B-Q4_K_M.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    defaultChatTemplate: {...chatTemplates.qwen25},
    chatTemplate: chatTemplates.qwen25,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.6,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 1000,
      temperature: 0.6,
    },
    defaultStopWords: ['<|im_end|>'],
    stopWords: ['<|im_end|>'],
    supportsThinking: true,
    hfModelFile: {
      rfilename: 'Qwen3-8B-Q4_K_M.gguf',
      url: 'https://huggingface.co/bartowski/Qwen3-8B-GGUF/resolve/main/Qwen3-8B-Q4_K_M.gguf',
      size: 5200000000,
      canFitInStorage: true,
    },
  },

  // -------- SmolVLM Vision — HuggingFace Paris 🇫🇷 --------
  {
    id: 'ggml-org/SmolVLM-500M-Instruct-GGUF/SmolVLM-500M-Instruct-Q8_0.gguf',
    author: 'ggml-org',
    repo: 'SmolVLM-500M-Instruct-GGUF',
    name: 'SmolVLM2 500M Vision (Q8_0)',
    type: 'SmolVLM',
    country: '🇫🇷',
    minRamGB: 2,
    capabilities: ['vision'],
    visionEnabled: true,
    size: 436806912,
    params: 409252800,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',
    progress: 0,
    filename: 'SmolVLM-500M-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    modelType: ModelType.VISION,
    defaultChatTemplate: chatTemplates.smolVLM,
    chatTemplate: chatTemplates.smolVLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    stopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    hfModelFile: {
      rfilename: 'SmolVLM-500M-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/SmolVLM-500M-Instruct-Q8_0.gguf',
      size: 436806912,
      canFitInStorage: true,
    },
    supportsMultimodal: true,
    compatibleProjectionModels: [
      'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    ],
    defaultProjectionModel:
      'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
  },
  {
    id: 'ggml-org/SmolVLM-500M-Instruct-GGUF/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    author: 'ggml-org',
    repo: 'SmolVLM-500M-Instruct-GGUF',
    name: 'mmproj-SmolVLM2-500M (Q8_0)',
    type: 'SmolVLM',
    country: '🇫🇷',
    minRamGB: 2,
    capabilities: [],
    size: 108783360,
    params: 409252800,
    isDownloaded: false,
    downloadUrl:
      'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    hfUrl: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF',
    progress: 0,
    filename: 'mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
    isLocal: false,
    origin: ModelOrigin.PRESET,
    modelType: ModelType.PROJECTION,
    defaultChatTemplate: chatTemplates.smolVLM,
    chatTemplate: chatTemplates.smolVLM,
    defaultCompletionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    completionSettings: {
      ...defaultCompletionParams,
      n_predict: 500,
      temperature: 0.7,
    },
    defaultStopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    stopWords: ['<|endoftext|>', '<|im_end|>', '<end_of_utterance>'],
    hfModelFile: {
      rfilename: 'mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
      url: 'https://huggingface.co/ggml-org/SmolVLM-500M-Instruct-GGUF/resolve/main/mmproj-SmolVLM-500M-Instruct-Q8_0.gguf',
      size: 108783360,
      canFitInStorage: true,
    },
  },
];

export const defaultModels =
  Platform.OS === 'android'
    ? [...androidOnlyModels, ...crossPlatformModels]
    : [...iosOnlyModels, ...crossPlatformModels];
