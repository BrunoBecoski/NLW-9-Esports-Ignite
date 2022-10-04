import { useState } from 'react';
import { Alert, Modal, ModalProps, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { Clock, GameController } from 'phosphor-react-native';

import { GameCardProps } from '../GameCard';

import { THEME } from '../../theme';
import { styles } from './styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props extends ModalProps {
  games: GameCardProps[],
}

export function CreateAdModal({ games, onRequestClose, ...rest }: Props) {
  const [hourStartPickerIsOpen, setHourStartPickerIsOpen] = useState(false);
  const [hourEndPickerIsOpen, setHourEndPickerIsOpen] = useState(false);

  const schema = z.object({
    game: z.string().uuid('Selecione algum game'),
    name: z.string().min(1, 'Campo vazio'),
    yearsPlaying: z.string().min(1, 'Campo vazio'),
    discord: z.string().min(6, 'Usuário inválido').max(37, 'Usuário inválido').regex(/#[0-9]{4}$/, 'Usuário inválido'),
    weekDays: z.array(z.string()).nonempty('Selecione algum dia').max(7),
    hourStart: z.string().regex(/[0-9]{2}:[0-9]{2}/, 'Selecione a hora'),
    hourEnd: z.string().regex(/[0-9]{2}:[0-9]{2}/, 'Selecione a hora'),
    useVoiceChannel: z.boolean(),
  })

  type Schema = z.infer<typeof schema>;

  const { handleSubmit, control, reset, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      game: '',
      name: '',
      yearsPlaying: '',
      discord: '',
      weekDays: [],
      hourStart: '--:--',
      hourEnd: '--:--',
      useVoiceChannel: false,
    }
  });

  function handleOnRequestClose() {
    onRequestClose();
    reset();
  }

  interface RadioButtonProps {
    onChange: (porps: string[]) => void;
    index: string;
    values: string[]; 
  }

  function handleRadioButton({ onChange, index, values }: RadioButtonProps) {
    if(values.includes(index)) {
      onChange(values.filter((item) => item !== index));
    } else {
      if(values.length) {
        onChange([...values, index]);
      } else {
        onChange([index]);
      }
    }
  }

  function handleCloseHourStart({ onChange, props }: any) {
    if (props.type === 'dismissed') {
      onChange('--:--');
      setHourStartPickerIsOpen(false);
      return;
    }

    const time = new Date(props.nativeEvent.timestamp);

    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());

    const timeFormatted = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

    onChange(timeFormatted)
    setHourStartPickerIsOpen(false);
  }

  function handleCloseHourEnd({ onChange, props }: any) {
    if (props.type === 'dismissed') {
      onChange('--:--');
      setHourEndPickerIsOpen(false);
      return;
    }

    const time = new Date(props.nativeEvent.timestamp);

    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());

    const timeFormatted = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

    onChange(timeFormatted);
    setHourEndPickerIsOpen(false);
  }

  function onSubmit(data: Schema) {
    try {
      fetch(`http://192.168.1.106:3333/games/${data.game}/ads`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: data.weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: data.useVoiceChannel,
        }),
      });

      Alert.alert('Anúncio criado com successo!')
      onRequestClose();
      reset();
    } catch (err) {
      Alert.alert('Erro ao criar o anúncio')
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Publique um anúncio</Text>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Qual o game?</Text>
            <Controller
              control={control}
              name="game"
              render={({ field: { onChange, value} }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={onChange}
                  dropdownIconColor={THEME.COLORS.TEXT}
                >
                  <Picker.Item
                    label="Selecione o game que deseja jogar"
                    style={styles.pickerItem}
                    enabled={false}
                  />
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
              )}
            />
            <Text style={styles.error}>{errors.game?.message}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Seu nome (ou nickname)</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value} }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Como te chamam dentro do game?"
                  placeholderTextColor={THEME.COLORS.CAPTION_500}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text style={styles.error}>{errors.name?.message}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Joga há quantos anos?</Text>
            <Controller
              control={control}
              name="yearsPlaying"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType='numeric'
                  style={styles.input}
                  placeholder="Tudo bem ser ZERO"
                  placeholderTextColor={THEME.COLORS.CAPTION_500}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text style={styles.error}>{errors.yearsPlaying?.message}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Qual seu Discord?</Text>
            <Controller
              control={control}
              name="discord"
              render={({ field: { onChange, value} }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Usuario#0000"
                  placeholderTextColor={THEME.COLORS.CAPTION_500}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text style={styles.error}>{errors.discord?.message}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Quando costuma jogar?</Text>
              <Controller
                name="weekDays"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View style={styles.radioWrapper}>
                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '0', values: value})}
                      style={value.includes('0') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>D</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '1', values: value}) }
                      style={value.includes('1') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>S</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '2', values: value})}
                      style={value.includes('2') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>T</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '3', values: value})}
                      style={value.includes('3') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>Q</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '4', values: value})}
                      style={value.includes('4') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>Q</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '5', values: value})}
                      style={value.includes('5') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>S</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRadioButton({onChange, index: '6', values: value})}
                      style={value.includes('6') ? styles.radioButtonActive : styles.radioButtonInactive}
                    >
                      <Text style={styles.radioButtonTitle}>S</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Text style={styles.error}>{errors.weekDays?.message}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.label}>Qual horário do dia?</Text>
            <View style={styles.timeWrapper}>
              <View style={styles.time}>
                <Text style={styles.label}>De</Text>
                <Controller
                  name="hourStart"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      onPress={() => setHourStartPickerIsOpen(true)}
                      style={styles.timeButton}
                    >
                      <Text style={styles.timeButtonTitle}>{value}</Text>
                      <Clock size={16} color={THEME.COLORS.TEXT} />
                      {
                        hourStartPickerIsOpen &&
                        <RNDateTimePicker
                          value={new Date()}
                          mode="time"
                          onChange={(props) => handleCloseHourStart({onChange, props})}
                        />
                      }
                    </TouchableOpacity>
                  )}
                />
                <Text style={styles.error}>{errors.hourStart?.message}</Text>
              </View>

              <View style={styles.time}>
                <Text style={styles.label}>Até</Text>
                <Controller
                  name="hourEnd"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      onPress={() => setHourEndPickerIsOpen(true)}
                      style={styles.timeButton}
                      >
                      <Text style={styles.timeButtonTitle}>{value}</Text>
                      <Clock size={16} color={THEME.COLORS.TEXT} />
                      {
                        hourEndPickerIsOpen &&
                        <RNDateTimePicker
                          value={new Date()}
                          mode="time"
                          onChange={(props) => handleCloseHourEnd({onChange, props})}
                        />
                      }
                    </TouchableOpacity>
                  )}
                />
                <Text style={styles.error}>{errors.hourEnd?.message}</Text>
              </View>
            </View>
          </View>

          <View style={styles.checkboxWrapper} >
            <Controller
              name="useVoiceChannel"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Checkbox
                    style={styles.checkbox}
                    onValueChange={onChange}
                    value={value}
                  />
                  <Text style={styles.checkboxTitle}>Costumo me conectar ao chat de voz</Text>
                </>
              )}
            />
            <Text style={styles.error}>{errors.useVoiceChannel?.message}</Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleOnRequestClose}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonTitle}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              <GameController size={24} color={THEME.COLORS.TEXT} />
              <Text style={styles.submitButtonTitle}>Encontrar duo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}