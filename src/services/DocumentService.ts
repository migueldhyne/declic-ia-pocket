import * as RNFS from '@dr.pogodin/react-native-fs';
import {Platform, NetInfo} from 'react-native';
import NetInfoModule from '@react-native-community/netinfo';
import {RAGDocument} from '../store/RAGStore';

const CHUNK_SIZE = 500;      // caractères par chunk
const CHUNK_OVERLAP = 50;    // overlap entre chunks

/**
 * Découpe un texte en chunks avec overlap.
 */
export function chunkText(text: string): string[] {
  const chunks: string[] = [];
  const cleanText = text.replace(/\s+/g, ' ').trim();

  if (cleanText.length <= CHUNK_SIZE) {
    return [cleanText];
  }

  let start = 0;
  while (start < cleanText.length) {
    const end = Math.min(start + CHUNK_SIZE, cleanText.length);
    let chunkEnd = end;

    // Essayer de couper à une phrase ou un espace
    if (end < cleanText.length) {
      const lastPeriod = cleanText.lastIndexOf('.', end);
      const lastSpace = cleanText.lastIndexOf(' ', end);
      if (lastPeriod > start + CHUNK_SIZE * 0.5) {
        chunkEnd = lastPeriod + 1;
      } else if (lastSpace > start) {
        chunkEnd = lastSpace;
      }
    }

    chunks.push(cleanText.slice(start, chunkEnd).trim());
    start = chunkEnd - CHUNK_OVERLAP;
    if (start < 0) start = 0;
  }

  return chunks.filter(c => c.length > 10);
}

/**
 * Extrait le texte d'un fichier TXT.
 */
export async function extractTextFromTxt(filePath: string): Promise<string> {
  return await RNFS.readFile(filePath, 'utf8');
}

/**
 * Vérifie si le wifi est disponible.
 */
export async function isWifiAvailable(): Promise<boolean> {
  try {
    const state = await NetInfoModule.fetch();
    return state.isConnected === true;
  } catch {
    return false;
  }
}

/**
 * OCR via l'API Mistral (nécessite wifi + clé API).
 */
export async function ocrWithMistral(
  fileUri: string,
  apiKey: string,
  fileType: 'pdf' | 'image',
): Promise<string> {
  // Lire le fichier en base64
  const base64 = await RNFS.readFile(fileUri, 'base64');
  const mimeType = fileType === 'pdf' ? 'application/pdf' : 'image/jpeg';

  const response = await fetch('https://api.mistral.ai/v1/ocr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-ocr-latest',
      document: {
        type: fileType === 'pdf' ? 'document_url' : 'image_url',
        [fileType === 'pdf' ? 'document_url' : 'image_url']:
          `data:${mimeType};base64,${base64}`,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Erreur OCR Mistral: ${response.status}`);
  }

  const data = await response.json();
  // L'API Mistral OCR retourne le texte dans pages[].markdown
  return (data.pages || [])
    .map((p: {markdown: string}) => p.markdown)
    .join('\n\n');
}

/**
 * Crée un document RAG à partir d'un fichier texte (TXT).
 */
export async function processTextFile(
  filePath: string,
  fileName: string,
  scope: 'global' | 'conversation',
  conversationId?: string,
): Promise<RAGDocument> {
  const text = await extractTextFromTxt(filePath);
  const chunks = chunkText(text);

  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    name: fileName,
    type: 'txt',
    scope,
    conversationId,
    chunks,
    addedAt: Date.now(),
    processedWithOCR: false,
  };
}

/**
 * Crée un document RAG à partir d'un PDF ou d'une image via OCR Mistral.
 */
export async function processWithOCR(
  fileUri: string,
  fileName: string,
  fileType: 'pdf' | 'image',
  apiKey: string,
  scope: 'global' | 'conversation',
  conversationId?: string,
): Promise<RAGDocument> {
  const text = await ocrWithMistral(fileUri, apiKey, fileType);
  const chunks = chunkText(text);

  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    name: fileName,
    type: fileType,
    scope,
    conversationId,
    chunks,
    addedAt: Date.now(),
    processedWithOCR: true,
  };
}
