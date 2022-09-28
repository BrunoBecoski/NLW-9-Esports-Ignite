import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import { CheckCircle, Copy } from 'phosphor-react';

interface DiscordModalProps {
  id: string;
}

export function DiscordModal({ id }: DiscordModalProps) {
  const [discord, setDiscord] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3333/ads/${id}/discord`)
      .then(response => setDiscord(response.data.discord));
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed flex flex-col gap-6 items-center bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25">
        <CheckCircle weight="bold" className="w-12 h-12 text-emerald-400" />

        <div className="text-center">
          <Dialog.Title className="text-3xl font-black">Let’s play!</Dialog.Title>
          <Dialog.Description className="text-zinc-400">Agora é só começar a jogar!</Dialog.Description>
        </div>

        <div className="w-full text-center">
          <strong className="block font-semibold mb-2">Adicione no Discord</strong>
          <button 
            onClick={()  => navigator.clipboard.writeText(discord)}
            className="w-full flex gap-4 items-center justify-between text-zinc-200 bg-zinc-900 hover:bg-zinc-900/75 rounded p-3 text-center"
          >
            <div className="w-4 h-4" />
            {discord}
             <Copy />
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}