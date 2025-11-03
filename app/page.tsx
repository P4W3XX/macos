"use client";

import NoteApp from "@/apps/note";
import CalculatorApp from "@/apps/calculator";
import Dock from "@/components/dock";
import { useAppStore } from "@/stores/appStore";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { apps, positions } = useAppStore();

  return (
    <div
      className=" w-screen h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('./SequoiaLight.png')" }}
    >
      <h1>Hello World</h1>
      <AnimatePresence>
        {apps["Notes"]?.isOpen && (
          <NoteApp key="note" buttonPosition={positions["Notes"]} />
        )}
        {apps["Calculator"]?.isOpen && (
          <CalculatorApp key="calculator" buttonPosition={positions["Calculator"]} />
        )}
      </AnimatePresence>
      <Dock />
    </div>
  );
}
