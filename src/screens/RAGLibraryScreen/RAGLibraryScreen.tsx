import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useTheme} from '../../hooks';
import {RAGDocumentManager} from '../../components/RAGDocumentManager';

/**
 * Écran "Base documentaire" — gestion des documents partagés
 * avec toutes les conversations (scope: 'global').
 */
export const RAGLibraryScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.surface}} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={{color: theme.colors.onSurface}}>
            📚 Base documentaire
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.description, {color: theme.colors.onSurfaceVariant}]}>
            Les documents ajoutés ici sont disponibles dans toutes vos
            conversations avec Déclic IA. L'IA pourra s'appuyer sur leur
            contenu pour répondre à vos questions.
          </Text>
        </View>

        <RAGDocumentManager />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16, gap: 16},
  header: {gap: 8, marginBottom: 8},
  description: {fontSize: 14, lineHeight: 20},
});
