import {makeAutoObservable, runInAction} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RAGDocument {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'image';
  scope: 'global' | 'conversation';
  conversationId?: string;
  chunks: string[];
  addedAt: number;
  processedWithOCR: boolean;
}

export class RAGStore {
  documents: RAGDocument[] = [];
  mistralApiKey: string = '';
  useMistralOCR: boolean = false;
  isProcessing: boolean = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'RAGStore',
      properties: ['documents', 'mistralApiKey', 'useMistralOCR'],
      storage: AsyncStorage,
    });
  }

  get isApiKeyPresent(): boolean {
    return this.mistralApiKey.trim().length > 0;
  }

  setMistralApiKey(key: string) {
    runInAction(() => {
      this.mistralApiKey = key.trim();
    });
  }

  setUseMistralOCR(value: boolean) {
    runInAction(() => {
      this.useMistralOCR = value;
    });
  }

  setIsProcessing(value: boolean) {
    runInAction(() => {
      this.isProcessing = value;
    });
  }

  addDocument(doc: RAGDocument) {
    runInAction(() => {
      this.documents = [doc, ...this.documents];
    });
  }

  removeDocument(id: string) {
    runInAction(() => {
      this.documents = this.documents.filter(d => d.id !== id);
    });
  }

  getDocumentsForContext(conversationId?: string): RAGDocument[] {
    return this.documents.filter(
      d => d.scope === 'global' ||
      (d.scope === 'conversation' && d.conversationId === conversationId)
    );
  }

  /**
   * Recherche par mots-clés dans les chunks des documents pertinents.
   * Retourne les chunks les plus pertinents pour le query.
   */
  retrieveRelevantChunks(query: string, conversationId?: string, maxChunks: number = 5): string[] {
    const docs = this.getDocumentsForContext(conversationId);
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);

    const scored: {chunk: string; score: number}[] = [];

    for (const doc of docs) {
      for (const chunk of doc.chunks) {
        const chunkLower = chunk.toLowerCase();
        let score = 0;
        for (const word of queryWords) {
          const matches = (chunkLower.match(new RegExp(word, 'g')) || []).length;
          score += matches;
        }
        if (score > 0) {
          scored.push({chunk, score});
        }
      }
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxChunks)
      .map(s => s.chunk);
  }

  clearAll() {
    runInAction(() => {
      this.documents = [];
    });
  }
}

export const ragStore = new RAGStore();
