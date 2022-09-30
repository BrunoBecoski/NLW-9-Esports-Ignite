import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 flex md:flex-row flex-col gap-4 justify-between items-center">
        <div className="md:text-start text-center"> 
          <strong className="block md:text-2xl text-xl text-white font-black">Não encontrou seu dou?</strong>
          <span className="block text-zinc-400 md:mt-0 mt-2 text-sm md:text-base">Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className="py-3 px-4 md:mt-0 mt-4  bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 font-medium">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
