import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdCard } from "../components/AdCard";

export interface AdData {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
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

  const [ads, setAds] = useState<AdData[]>([]);

  useEffect(() => {
    axios(`http://localhost:3333/games/${id}/ads`).then(response => {
      setAds(response.data)
    }) 
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto my-20 px-4">
      <div ref={sliderRef} className="overflow-hidden flex">
        { ads.map(ad => ( <AdCard key={ad.id} ad={ad} /> ))}
      </div>
    </div>
  )
}