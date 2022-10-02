import { useState } from 'react';
import { Modal, ModalProps, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { Clock, GameController } from 'phosphor-react-native';

import { GameCardProps } from '../GameCard';

import { THEME } from '../../theme';
import { styles } from './styles';

interface Props extends ModalProps {
  games: GameCardProps[],
}

export function CreateAdModal({ games, onRequestClose, ...rest }: Props) {
  const [game, setGame] = useState('');
  const [weekDays, setWeekDays] = useState([
    {
      id: '1',
      value: 'D',
      active: false,
    }, {
      id: '2',
      value: 'S',
      active: false,
    }, {
      id: '3',
      value: 'T',
      active: false,
    }, {
      id: '4',
      value: 'Q',
      active: false,
    }, {
      id: '5',
      value: 'Q',
      active: false,
    }, {
      id: '6',
      value: 'S',
      active: false,
    }, {
      id: '7',
      value: 'S',
      active: false,
    }
  ]);
  const [hourStart, setHourStart] = useState({
    isOpen: false,
    time: '00:00',
  });
  const [hourEnd, setHourEnd] = useState({
    isOpen: false,
    time: '00:00',
  });
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  function handleRadioButton(id: string) {
    const weekDaysUpdated = weekDays.map(day => {
      if (day.id === id) {
        return {
          ...day,
          active: !day.active,
        }
      } else {
        return day
      }
    })

    setWeekDays(weekDaysUpdated);
  }

  function handleOpenHourStart() {
    setHourStart({
      isOpen: true,
      time: '00:00',
    });
  }

  function handleCloseHourStart(data: any) {
    if (data.type === 'dismissed') {
      setHourStart({
        isOpen: false,
        time: '00:00',
      });
      return;
    }

    const time = new Date(data.nativeEvent.timestamp);

    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());

    const timeFormatted = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

    setHourStart({
      isOpen: false,
      time: timeFormatted,
    });
  }

  function handleOpenHourEnd() {
    setHourEnd({
      isOpen: true,
      time: '00:00',
    });
  }

  function handleCloseHourEnd(data: any) {
    if (data.type === 'dismissed') {
      setHourEnd({
        isOpen: false,
        time: '00:00',
      });
      return;
    }

    const time = new Date(data.nativeEvent.timestamp);

    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());

    const timeFormatted = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

    setHourEnd({
      isOpen: false,
      time: timeFormatted,
    });
  }


  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>

        <Text style={styles.title}>Publique um anúncio</Text>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Qual o game?</Text>
          <Picker
            style={styles.picker}
            selectedValue={game}
            onValueChange={(itemValue) => setGame(itemValue)}
          >
            {games.map(game => {
              return (
                <Picker.Item
                  key={game.id}
                  style={styles.pickerItem}
                  label={game.title}
                  value={game.id}
                />
              )
            })}
          </Picker>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Seu nome (ou nickname)</Text>
          <TextInput
            style={styles.input}
            placeholder="Como te chamam dentro do game?"
            placeholderTextColor={THEME.COLORS.CAPTION_500}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Joga há quantos anos?</Text>
          <TextInput
            style={styles.input}
            placeholder="Tudo bem ser ZERO"
            placeholderTextColor={THEME.COLORS.CAPTION_500}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Qual seu Discord?</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario#0000"
            placeholderTextColor={THEME.COLORS.CAPTION_500}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Quando costuma jogar?</Text>
          <View style={styles.radioWrapper}>
            {weekDays.map(day => {
              return (
                <TouchableOpacity
                  key={day.id}
                  onPress={() => handleRadioButton(day.id)}
                  style={day.active ? styles.radioButtonActive : styles.radioButtonInactive}
                >
                  <Text style={styles.radioButtonTitle}>{day.value}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.label}>Qual horário do dia?</Text>
          <View style={styles.timeWrapper}>
            <View style={styles.time}>
              <Text style={styles.label}>De</Text>
              <TouchableOpacity
                onPress={handleOpenHourStart}
                style={styles.timeButton}
              >
                <Text style={styles.timeButtonTitle}>{hourStart.time}</Text>
                <Clock size={16} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
              {
                hourStart.isOpen &&
                <RNDateTimePicker
                  value={new Date()}
                  mode="time"
                  onChange={handleCloseHourStart}
                />
              }
            </View>

            <View style={styles.time}>
              <Text style={styles.label}>Até</Text>
              <TouchableOpacity
                onPress={handleOpenHourEnd}
                style={styles.timeButton}
              >
                <Text style={styles.timeButtonTitle}>{hourEnd.time}</Text>
                <Clock size={16} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
              {
                hourEnd.isOpen &&
                <RNDateTimePicker
                  value={new Date()}
                  mode="time"
                  onChange={handleCloseHourEnd}
                />
              }
            </View>
          </View>
        </View>

        <View style={styles.checkboxWrapper} >
          <Checkbox
            style={styles.checkbox}
            value={useVoiceChannel}
            onValueChange={setUseVoiceChannel}
          />
          <Text style={styles.checkboxTitle}>Costumo me conectar ao chat de voz</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onRequestClose}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonTitle}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton}>
            <GameController size={24} color={THEME.COLORS.TEXT} />
            <Text style={styles.submitButtonTitle}>Encontrar duo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}