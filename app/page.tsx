"use client";

import NoteApp from "@/apps/note";
import CalculatorApp from "@/apps/calculator";
import Dock from "@/components/dock";
import Topbar from "@/components/topbar";
import { useAppStore } from "@/stores/appStore";
import { AnimatePresence } from "framer-motion";
import FinderApp from "@/apps/finder";

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
        {apps["Calculator"]?.isOpen && (
          <CalculatorApp key="calculator" buttonPosition={positions["Calculator"]} />
        )}
        {apps["Finder"]?.isOpen && (
          <FinderApp key="finder" buttonPosition={positions["Finder"]} />
        )}
      </AnimatePresence>
      <Dock />
    </div>
  );
}
