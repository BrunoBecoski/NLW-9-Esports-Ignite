import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MagnifyingGlassPlus } from 'phosphor-react-native';

import { THEME } from '../../theme';
import { styles } from './styles';

export function CreateAdBanner() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Não encontrou seu duo?</Text>
        <Text style={styles.subtitle}>Publique um anúncio para encontrar novos players!</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <MagnifyingGlassPlus size={24} color={THEME.COLORS.TEXT}/>
        <Text style={styles.buttonTitle}>Publicar anúncio</Text>
      </TouchableOpacity>
    </View>
  );
}