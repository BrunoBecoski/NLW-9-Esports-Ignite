import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useKeenSlider } from 'keen-slider/react';
import * as Dialog from '@radix-ui/react-dialog';

import { AdCard } from '../components/AdCard';
import { DiscordModal } from '../components/DiscordModal';

export interface AdData {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface Game {
  title: string;
  bannerUrl: string;
}

export function Ad() {
  const { id } = useParams()

  const sliderOptions = {
    slides: {
      perView: 6,
      spacing: 24,
    }, 
  }
 
  const [ sliderRef, instanceRef ] = useKeenSlider<HTMLDivElement>(sliderOptions);

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions
    });
  }, [instanceRef, sliderOptions]);

  const [game, setGame] = useState<Game>({} as Game);
  const [ads, setAds] = useState<AdData[]>([]);

  useEffect(() => {
    axios(`http://localhost:3333/games/${id}/ads`).then(response => {
      setGame(response.data.game);
      setAds(response.data.ads);
    }) 
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto my-10 px-4">
      <img src={game.bannerUrl} className="h-[40vh] rounded-lg mx-auto" />
      <div className="my-10 text-center">
        <strong className="text-white font-black text-2xl block">{game.title}</strong>
        <span className="text-zinc-400 block">Conecte-se e comece a jogar!</span>
      </div>

      <div ref={sliderRef} className="overflow-hidden flex">
        { ads.map(ad => ( 
          <Dialog.Root key={ad.id}>
            <AdCard ad={ad} /> 
            <DiscordModal id={ad.id} />
          </Dialog.Root>
        ))}
      </div>
    </div>
  )
}