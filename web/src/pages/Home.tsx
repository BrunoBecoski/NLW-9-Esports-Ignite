import * as Dialog from '@radix-ui/react-dialog';

import { Carousel } from '../components/Carousel';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';

import logoImg from '../assets/logo-nlw-esports.svg';

export function Home() {
  return (
    <div className="max-w-[1344px] mx-auto md:my-20 my-10 px-4 flex flex-col items-center">
      <img src={logoImg} alt="" className="md:w-auto w-48" />

      <h1 className="md:text-6xl text-4xl text-white font-black md:mt-20 mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <Carousel />
    
      <Dialog.Root>
        <CreateAdBanner />
        
        <CreateAdModal />
      </Dialog.Root>
    </div >
  )
}