import { useEffect, useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToogleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);

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

  const { register, handleSubmit, control, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      game: '',
      name: '',
      yearsPlaying: '',
      discord: '',
      weekDays: [''],
      hourStart: '',
      hourEnd: '',
      useVoiceChannel: false,
    }
  });

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, []);

  async function onSubmit(data: Schema) {   
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: data.weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel,
      });

      alert('Anúncio criado com successo!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal >
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col gap-2 m-0">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            {/* @ts-ignore */}
            <Controller
              control={control}
              name="game"
              render={({
                field: { onChange },
              }) =>
                <Select.Root
                  onValueChange={onChange}
                  onOpenChange={console.clear}
                >
                  <Select.Trigger className="flex justify-between items-center bg-zinc-900  py-3 px-4 rounded text-sm">
                    <Select.Value placeholder="Selecione o game que deseja jogar" />
                    <Select.Icon>
                      <CaretDown className="w-6 h-6 text-zinc-400" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal className="rounded overflow-hidden">
                    <Select.Content>
                      <Select.Viewport>
                        <Select.Group className="text-white">
                          {games.map(game => {
                            return (
                              <Select.Item key={game.id} value={game.id} className="py-3 px-4 cursor-pointer bg-zinc-900 hover:bg-zinc-600">
                                <Select.ItemText>
                                  {game.title}
                                </Select.ItemText>
                              </Select.Item>
                            )
                          })}
                        </Select.Group>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              }
            >
            </Controller>
            <span className="text-sm text-red-500">{errors.game?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
            <Input
              id="name"
              placeholder="Como te chamam dentro do game?"
              register={register("name")}
            />
            <span className="text-sm text-red-500">{errors.name?.message}</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                type="number"
                min="0"
                placeholder="Tudo bem ser ZERO?"
                register={register("yearsPlaying")}
              />
              <span className="text-sm text-red-500">{errors.yearsPlaying?.message}</span>

            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
              <Input
                id="discord"
                placeholder="Usuario#0000"
                register={register("discord")}
              />
              <span className="text-sm text-red-500">{errors.discord?.message}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="weekDays" className="font-semibold">Quanto costuma jogar?</label>
            {/* @ts-ignore */}
            <Controller
              control={control}
              name="weekDays"
              render={({
                field: { onChange, value },
              }) =>
                <ToogleGroup.Root
                  type="multiple"
                  className="flex justify-between gap-1"
                  onValueChange={onChange}
                  value={value}
                >
                  <ToogleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-11 h-11 font-bold rounded ${value.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    D
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-11 h-11 font-bold rounded ${value.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-11 h-11 font-bold rounded ${value.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    T
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-11 h-11 font-bold rounded ${value.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    Q
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-11 h-11 font-bold rounded ${value.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    Q
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-11 h-11 font-bold rounded ${value.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToogleGroup.Item>

                  <ToogleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-11 h-11 font-bold rounded ${value.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    S
                  </ToogleGroup.Item>
                </ToogleGroup.Root>
              }
            >
            </Controller>
            <span className="text-sm text-red-500">{errors.weekDays?.message}</span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="hourStart" className="text-sm">De</label>
                <Input
                  id="hourStart"
                  type="time"
                  register={register("hourStart")}
                />
                <span className="text-sm text-red-500">{errors.hourStart?.message}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="hourEnd" className="text-sm">Até</label>
                <Input
                  id="hourEnd"
                  type="time"
                  register={register("hourEnd")}
                />
                <span className="text-sm text-red-500">{errors.hourEnd?.message}</span>
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
            <Controller
              control={control}
              name="useVoiceChannel"
              render={({
                field: { onChange, value },
              }) =>
                <Checkbox.Root
                  checked={value}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      onChange(true)
                    } else {
                      onChange(false)
                    }
                  }}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              }
            />
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}