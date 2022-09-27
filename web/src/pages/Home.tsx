import * as Dialog from '@radix-ui/react-dialog';

import { Carousel } from '../components/Carousel';
import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';

import logoImg from '../assets/logo-nlw-esports.svg';

export function Home() {
  return (
    <div className="max-w-[1344px] mx-auto my-20 px-4 flex flex-col items-center ">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
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