"use client";

import { DockApps } from "@/AppsConfig";
import { motion } from "framer-motion";
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
    <main className=" absolute w-[99%] right-0 flex items-center px-2 left-0 mx-auto bottom-3 bg-white/30 h-18 backdrop-blur-3xl rounded-3xl">
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
        </motion.button>
      ))}
    </main>
  );
}
