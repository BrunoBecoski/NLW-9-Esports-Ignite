import { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react';

import { GameBanner } from './GameBanner';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Carousel() {
  const [games, setGames] = useState<Game[]>([]); 

  const sliderOptions = {
    loop: true,
    slides: {
      perView: 6,
      spacing: 24,
    },  
  }  

  const [sliderRef, instanceRef] = useKeenSlider(sliderOptions);

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions
    });
  }, [instanceRef, sliderOptions]);

  function ArrowLeft() {
    return (
      <CaretLeft    
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
        className="w-12 h-12 cursor-pointer text-zinc-500 hover:text-zinc-300"
      />
    )
  }  

  function ArrowRight() {
    return (
      <CaretRight    
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
        className="w-12 h-12 cursor-pointer text-zinc-500 hover:text-zinc-300"
      />
    )
  }  

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })  
  }, []);  

  return (
    <div className="mt-16 flex items-center gap-6 w-full">
      <ArrowLeft />

      <div ref={sliderRef} className="w-full flex overflow-hidden">
        {
          games.map(game => {
            return (
              <GameBanner
                key={game.id}
                id={game.id}
                title={game.title}
                adsCount={game._count.ads}
                bannerUrl={game.bannerUrl}
                className="keen-slider__slide"
              />
            )
          })
        }
      </div>
      <ArrowRight />
    </div>
  )
}