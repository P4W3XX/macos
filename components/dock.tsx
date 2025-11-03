"use client";

import { DockApps } from "@/AppsConfig";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAppStore } from "../stores/appStore";
import { useRef, useEffect } from "react";

export default function Dock() {
  const { apps, toggleApp, minimizeApp, restoreApp, setPosition } =
    useAppStore();
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleClick = (appName: string) => {
    console.log("Clicked on", appName);
    if (apps[appName]?.isMinimized) {
      restoreApp(appName);
    } else if (apps[appName]?.isOpen) {
      minimizeApp(appName);
    } else {
      const button = buttonRefs.current[appName];
      if (button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setPosition(appName, { x: centerX, y: centerY });
      }
      toggleApp(appName);
    }
  };

  useEffect(() => {
    const updatePositions = () => {
      DockApps.forEach((app) => {
        const button = buttonRefs.current[app.name];
        if (button) {
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          setPosition(app.name, { x: centerX, y: centerY });
        }
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [setPosition]);

  return (
    <main className=" absolute w-[80%] border border-[#FFFFFFFF]/20 shadow-[0_4px_30px_20px_rgba(0,0,0,0.15)] right-0 flex items-end backdrop-blur-[5px] px-2 left-0 mx-auto bottom-3 bg-[#F6F6F6]/36 h-20 rounded-[22px]">
      {DockApps.map((app) => (
        <motion.button
          ref={(el) => {
            buttonRefs.current[app.name] = el;
          }}
          whileHover={{ scale: 1.4, y: -30 }}
          whileTap={{ scale: 1.1 }}
          key={app.name}
          className=" group relative"
          onClick={() => handleClick(app.name)}
        >
          <h1 className=" absolute left-0 right-0 mx-auto w-fit -top-5 group-hover:opacity-100 text-shadow-lg/40 opacity-0 transition-opacity font-semibold z-10 text-white text-sm">
            {app.name}
          </h1>
          <Image
            src={app.iconPath}
            alt={app.name}
            width={24}
            height={24}
            className=" size-14 rounded-2xl"
          />
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale:
                  apps[app.name]?.isOpen && !apps[app.name]?.isMinimized
                    ? 1
                    : 0,
              }}
              exit={{ scale: 0 }}
              className=" mx-auto w-1.5 h-1.5 mt-1 mb-1 bg-black/60  rounded-full"
            />
          </AnimatePresence>
        </motion.button>
      ))}
    </main>
  );
}
