import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';

import { AdData } from "../pages/Ad";

interface AdCardProps {
  ad: AdData;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <div className="keen-slider__slide flex flex-col gap-4 bg-[#2A2634] p-5 rounded-lg">
      <div className="flex flex-col gap-1 text-sm text-zinc-300">
        Nome
        <span className="text-sm font-bold text-white">
          {ad.name}
        </span>
      </div>
      <div className="flex flex-col gap-1 text-sm text-zinc-300">
        Tempo de jogo
        <span className="text-sm font-bold text-white">
          {ad.yearsPlaying}
        </span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-zinc-300">
        Disponibilidade
        <span className="text-sm font-bold text-white">
          {`${ad.weekDays.length} dias \u2022 ${ad.hourStart} - ${ad.hourEnd}`}
        </span>
      </div>

      <div className="flex flex-col gap-1text-sm text-zinc-300">
        Chamada de aúdio?
        <span className={`text-sm font-bold ${ad.useVoiceChannel ? 'text-emerald-500' : 'text-red-500'}`}>
          {ad.useVoiceChannel ? 'Sim' : 'Não'}
        </span>
      </div>

      <Dialog.Trigger className="flex gap-2 justify-center p-2 w-full rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold">
        <GameController className="w-5 h-5"/>
        Conectar
      </Dialog.Trigger>
    </div>
  )
}