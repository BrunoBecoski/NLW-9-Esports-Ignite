import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MagnifyingGlassPlus } from 'phosphor-react-native';

import { GameCardProps } from '../GameCard';
import { CreateAdModal } from '../CreateAdModal/indext';

import { THEME } from '../../theme';
import { styles } from './styles';

interface CreateAdBannerProps {
  games: GameCardProps[];
}

export function CreateAdBanner({ games }: CreateAdBannerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Não encontrou seu duo?</Text>
        <Text style={styles.subtitle}>Publique um anúncio para encontrar novos players!</Text>
      </View>

      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <MagnifyingGlassPlus size={24} color={THEME.COLORS.TEXT}/>
        <Text style={styles.buttonTitle}>Publicar anúncio</Text>
      </TouchableOpacity>

      <CreateAdModal
        games={games}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      />
    </View>
  );
}