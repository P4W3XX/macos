"use client";

import NoteApp from "@/apps/note";
import Dock from "@/components/dock";
import Topbar from "@/components/topbar";
import { useAppStore } from "@/stores/appStore";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { apps, positions } = useAppStore();

  return (
    <div
      className=" w-screen h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('./SequoiaLight.png')" }}
    >
      <Topbar />
      <AnimatePresence>
        {apps["Notes"]?.isOpen && (
          <NoteApp key="note" buttonPosition={positions["Notes"]} />
        )}
      </AnimatePresence>
      <Dock />
    </div>
  );
}
