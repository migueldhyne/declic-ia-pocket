import React, {useState, useContext} from 'react';
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Card, IconButton, ActivityIndicator} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {pick, types} from '@react-native-documents/picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {useTheme} from '../../hooks';
import {ragStore, RAGDocument} from '../../store/RAGStore';
import {
  processTextFile,
  processWithOCR,
  isWifiAvailable,
} from '../../services/rag/DocumentService';

interface RAGDocumentManagerProps {
  scope: 'global' | 'conversation';
  conversationId?: string;
}

export const RAGDocumentManager: React.FC<RAGDocumentManagerProps> = observer(
  ({scope, conversationId}) => {
    const theme = useTheme();
    const [isAdding, setIsAdding] = useState(false);

    const documents = ragStore.getDocumentsForContext(conversationId).filter(
      d => d.scope === scope
    );

    const handleAddFile = async () => {
      try {
        const result = await pick({
          type: Platform.OS === 'ios' ? 'public.data' : types.allFiles,
        });
        const [file] = result;
        if (!file) return;

        const fileName = file.name || 'Document';
        const fileUri = file.uri;
        const isPDF = fileName.toLowerCase().endsWith('.pdf');
        const isTXT = fileName.toLowerCase().endsWith('.txt') ||
                      fileName.toLowerCase().endsWith('.md');

        setIsAdding(true);
        ragStore.setIsProcessing(true);

        if (isTXT) {
          const doc = await processTextFile(fileUri, fileName, scope, conversationId);
          ragStore.addDocument(doc);
          Alert.alert('✅ Document ajouté', `"${fileName}" est prêt.`);
        } else if (isPDF) {
          await handleOCRFile(fileUri, fileName, 'pdf');
        } else {
          Alert.alert('Format non supporté', 'Utilisez un fichier PDF, TXT ou une photo.');
        }
      } catch (e: any) {
        if (!e?.message?.includes('cancelled')) {
          Alert.alert('Erreur', e?.message || 'Impossible d\'ajouter le fichier');
        }
      } finally {
        setIsAdding(false);
        ragStore.setIsProcessing(false);
      }
    };

    const handleAddPhoto = async () => {
      try {
        const result = await launchImageLibrary({mediaType: 'photo', quality: 0.8});
        if (result.didCancel || !result.assets?.[0]) return;

        const asset = result.assets[0];
        const fileName = asset.fileName || 'Photo.jpg';
        const fileUri = asset.uri || '';

        setIsAdding(true);
        ragStore.setIsProcessing(true);
        await handleOCRFile(fileUri, fileName, 'image');
      } catch (e: any) {
        Alert.alert('Erreur', e?.message || 'Impossible d\'ajouter la photo');
      } finally {
        setIsAdding(false);
        ragStore.setIsProcessing(false);
      }
    };

    const handleTakePhoto = async () => {
      try {
        const result = await launchCamera({mediaType: 'photo', quality: 0.8});
        if (result.didCancel || !result.assets?.[0]) return;

        const asset = result.assets[0];
        const fileName = asset.fileName || `Photo_${Date.now()}.jpg`;
        const fileUri = asset.uri || '';

        setIsAdding(true);
        ragStore.setIsProcessing(true);
        await handleOCRFile(fileUri, fileName, 'image');
      } catch (e: any) {
        Alert.alert('Erreur', e?.message || 'Impossible de prendre la photo');
      } finally {
        setIsAdding(false);
        ragStore.setIsProcessing(false);
      }
    };

    const handleOCRFile = async (
      fileUri: string,
      fileName: string,
      fileType: 'pdf' | 'image',
    ) => {
      if (!ragStore.isApiKeyPresent) {
        Alert.alert(
          '🔑 Clé API requise',
          'L\'OCR nécessite une clé API Mistral. Configurez-la dans les Paramètres > API.',
        );
        return;
      }

      const wifi = await isWifiAvailable();
      if (!wifi) {
        Alert.alert(
          '📶 Wifi requis',
          'L\'OCR de PDF et photos nécessite une connexion wifi pour utiliser l\'API Mistral.',
        );
        return;
      }

      // Notifier l'utilisateur que l'OCR utilise le wifi
      Alert.alert(
        '📶 Traitement en ligne',
        `Le fichier "${fileName}" va être envoyé à l'API Mistral OCR via wifi pour extraction du texte. Il sera ensuite stocké localement.`,
        [
          {text: 'Annuler', style: 'cancel'},
          {
            text: 'Continuer',
            onPress: async () => {
              try {
                const doc = await processWithOCR(
                  fileUri,
                  fileName,
                  fileType,
                  ragStore.mistralApiKey,
                  scope,
                  conversationId,
                );
                ragStore.addDocument(doc);
                Alert.alert(
                  '✅ Document traité',
                  `"${fileName}" a été traité par OCR et ajouté à votre base.`,
                );
              } catch (e: any) {
                Alert.alert('Erreur OCR', e?.message || 'Échec du traitement OCR');
              }
            },
          },
        ],
      );
    };

    const handleRemove = (doc: RAGDocument) => {
      Alert.alert(
        'Supprimer le document',
        `Voulez-vous supprimer "${doc.name}" de la base ?`,
        [
          {text: 'Annuler', style: 'cancel'},
          {
            text: 'Supprimer',
            style: 'destructive',
            onPress: () => ragStore.removeDocument(doc.id),
          },
        ],
      );
    };

    const renderDoc = ({item}: {item: RAGDocument}) => (
      <View style={[styles.docItem, {borderColor: theme.colors.outline}]}>
        <View style={styles.docInfo}>
          <Text style={{color: theme.colors.onSurface, fontWeight: '600'}}>
            {item.type === 'pdf' ? '📄' : item.type === 'image' ? '🖼️' : '📝'}{' '}
            {item.name}
          </Text>
          <Text style={{color: theme.colors.onSurfaceVariant, fontSize: 12}}>
            {item.chunks.length} segments
            {item.processedWithOCR ? ' • OCR 📶' : ' • local'}
            {' • '}{new Date(item.addedAt).toLocaleDateString('fr-FR')}
          </Text>
        </View>
        <IconButton
          icon="delete-outline"
          size={20}
          iconColor={theme.colors.error}
          onPress={() => handleRemove(item)}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        {/* Boutons d'ajout */}
        <View style={styles.addButtons}>
          <Button
            mode="outlined"
            icon="file-plus-outline"
            onPress={handleAddFile}
            disabled={isAdding}
            style={styles.addButton}>
            Fichier (PDF/TXT)
          </Button>
          <Button
            mode="outlined"
            icon="image-plus"
            onPress={handleAddPhoto}
            disabled={isAdding}
            style={styles.addButton}>
            Photo
          </Button>
          <Button
            mode="outlined"
            icon="camera"
            onPress={handleTakePhoto}
            disabled={isAdding}
            style={styles.addButton}>
            Appareil photo
          </Button>
        </View>

        {isAdding && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={{color: theme.colors.onSurfaceVariant, marginLeft: 8}}>
              Traitement en cours...
            </Text>
          </View>
        )}

        {/* Note OCR wifi */}
        <Text style={[styles.note, {color: theme.colors.onSurfaceVariant}]}>
          📝 TXT/MD : traitement hors ligne ✅{'\n'}
          📄 PDF / 🖼️ Photos : OCR via Mistral (📶 wifi requis)
        </Text>

        {/* Liste des documents */}
        {documents.length === 0 ? (
          <Text style={[styles.empty, {color: theme.colors.onSurfaceVariant}]}>
            Aucun document ajouté. L'IA pourra consulter vos documents pour répondre.
          </Text>
        ) : (
          <FlatList
            data={documents}
            keyExtractor={d => d.id}
            renderItem={renderDoc}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {gap: 12},
  addButtons: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  addButton: {flex: 1, minWidth: 100},
  loadingRow: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  note: {fontSize: 12, fontStyle: 'italic'},
  empty: {fontSize: 13, fontStyle: 'italic', textAlign: 'center', marginTop: 8},
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  docInfo: {flex: 1, gap: 2},
});
