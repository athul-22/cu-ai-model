import { DarkModeToggle } from "@/components/dark-mode-toggle"; 
import { Chat } from "@/components/chat";
import { FileUpload } from "@/components/file-upload";
import {FriendConnector} from '@/components/friend-match';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative container flex min-h-screen flex-col">
      <div className="p-4 flex h-20 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <span className="font-bold flex justify-center"><Sparkles />BT SAGA </span>
        <div className="flex items-center space-x-4 ml-auto">
          <FriendConnector/>
          <FileUpload />
          <DarkModeToggle />
        </div>
      </div>
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat />
        </div>
      </div>
      
    </main>
  );
}
