import React, {useState, useContext} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import {Sheet} from './Sheet';
import {TextInput} from './TextInput';
import {useTheme} from '../hooks';
import {ragStore} from '../store/RAGStore';
import {L10nContext} from '../utils';

interface MistralTokenSheetProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const MistralTokenSheet: React.FC<MistralTokenSheetProps> = observer(
  ({isVisible, onDismiss}) => {
    const theme = useTheme();
    const l10n = useContext(L10nContext);
    const [token, setToken] = useState('');

    const handleSave = () => {
      if (!token.trim()) {
        Alert.alert('Erreur', 'Veuillez entrer une clé API valide');
        return;
      }
      ragStore.setMistralApiKey(token.trim());
      Alert.alert('Succès', 'Clé API Mistral enregistrée');
      setToken('');
      onDismiss();
    };

    const handleReset = () => {
      ragStore.setMistralApiKey('');
      Alert.alert('Succès', 'Clé API Mistral supprimée');
      onDismiss();
    };

    return (
      <Sheet
        title="Clé API Mistral (OCR)"
        isVisible={isVisible}
        onClose={onDismiss}>
        <Sheet.ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>
            Nécessaire pour l'OCR des PDF et photos. Requiert une connexion wifi.
          </Text>

          <Text style={[styles.label, {color: theme.colors.onSurface}]}>
            Clé API Mistral
          </Text>
          <TextInput
            value={token}
            onChangeText={setToken}
            placeholder={ragStore.isApiKeyPresent ? '••••••••••••••••' : 'Collez votre clé ici'}
            secureTextEntry
          />

          <Text style={[styles.instructions, {color: theme.colors.onSurfaceVariant}]}>
            Comment obtenir une clé :
          </Text>
          <Text style={[styles.step, {color: theme.colors.onSurfaceVariant}]}>
            1. Allez sur console.mistral.ai
          </Text>
          <Text style={[styles.step, {color: theme.colors.onSurfaceVariant}]}>
            2. Créez un compte et allez dans API Keys
          </Text>
          <Text style={[styles.step, {color: theme.colors.onSurfaceVariant}]}>
            3. Créez une nouvelle clé et copiez-la ici
          </Text>

          <Text style={[styles.note, {color: theme.colors.onSurfaceVariant}]}>
            💡 L'OCR est payant (~2€ pour 1000 pages). Vos documents sont traités
            en ligne puis stockés localement.
          </Text>
        </Sheet.ScrollView>

        <Sheet.Actions>
          <View style={styles.buttons}>
            <Button mode="text" onPress={onDismiss}>
              Annuler
            </Button>
            {ragStore.isApiKeyPresent && (
              <Button mode="outlined" onPress={handleReset} textColor={theme.colors.error}>
                Supprimer
              </Button>
            )}
            <Button mode="contained" onPress={handleSave}>
              Enregistrer
            </Button>
          </View>
        </Sheet.Actions>
      </Sheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructions: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
  },
  step: {
    fontSize: 13,
    marginLeft: 8,
  },
  note: {
    fontSize: 12,
    marginTop: 16,
    fontStyle: 'italic',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    padding: 8,
  },
});
