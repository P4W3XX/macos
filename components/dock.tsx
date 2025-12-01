"use client";

import { DockApps } from "@/AppsConfig";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAppStore } from "../stores/appStore";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import useAppearanceSettings from "@/stores/settingsStore";

const BASE_ICON_SIZE = 64;
const GAP_PX = 2;

export default function Dock() {
  const { apps, toggleApp, minimizeApp, restoreApp, setPosition } =
    useAppStore();

  const { dockAnimation } = useAppearanceSettings();

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [baseCenters, setBaseCenters] = useState<Record<string, number>>({});

  useLayoutEffect(() => {
    const measureCenters = () => {
      const newCenters: Record<string, number> = {};

      DockApps.forEach((app) => {
        const el = buttonRefs.current[app.name];
        if (el) {
          const rect = el.getBoundingClientRect();
          newCenters[app.name] = rect.left + rect.width / 2;
        }
      });

      setBaseCenters(newCenters);
    };
    measureCenters();

    window.addEventListener("resize", measureCenters);
    return () => window.removeEventListener("resize", measureCenters);
  }, []);

  const handleClick = useCallback(
    (appName: string) => {
      const app = apps[appName];
      if (app?.isMinimized) {
        restoreApp(appName);
      } else if (app?.isOpen) {
        minimizeApp(appName);
      } else {
        const el = buttonRefs.current[appName];
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          setPosition(appName, { x: centerX, y: centerY });
        }
        toggleApp(appName);
      }
    },
    [apps, minimizeApp, restoreApp, toggleApp, setPosition]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dockAnimation) {
      setMouseX(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    if (dockAnimation) {
      setMouseX(null);
    }
  };

  const getIconAnimation = useCallback(
    (appName: string) => {
      if (!dockAnimation || mouseX === null || !baseCenters[appName]) {
        return { scale: 1, x: 0, y: 0 };
      }

      const center = baseCenters[appName];
      const distance = Math.abs(mouseX - center);

      const maxDistance = 200;
      const maxScale = 1.6;
      const minScale = 1;
      const pushFactor = 0.35;
      const yFactor = -22;

      const normalized = Math.max(0, 1 - distance / maxDistance);
      const scale = minScale + normalized * (maxScale - minScale);
      const y = normalized * yFactor;
      const x = (center - mouseX) * normalized * pushFactor;

      return { scale, x, y };
    },
    [mouseX, baseCenters, dockAnimation]
  );

  return (
    <motion.div
      className="absolute left-0 right-0 mx-auto bottom-3
             flex items-end justify-center w-fit
             backdrop-blur-[6px] 
             bg-[#F6F6F6]/30 border border-white/20 
             shadow-[0_4px_30px_20px_rgba(0,0,0,0.15)]
             h-20 rounded-[22px]
             px-1"
      onMouseMove={dockAnimation ? handleMouseMove : undefined}
      onMouseLeave={dockAnimation ? handleMouseLeave : undefined}
    >
      <div className="flex items-end h-full" style={{ gap: `${GAP_PX}px` }}>
        {DockApps.map((app) => {
          const { scale, x, y } = getIconAnimation(app.name);

          return (
            <motion.button
              key={app.name}
              ref={(el: HTMLButtonElement | null) => {
                buttonRefs.current[app.name] = el;
              }}
              animate={{ scale, x, y }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                mass: 0.8,
              }}
              whileTap={{ scale: scale * 0.9 }}
              onClick={() => handleClick(app.name)}
              className="group relative"
            >
              <div
                className={`absolute bg-[#F6F6F6]/30 border border-white/20 rounded-sm px-3 left-0 right-0 mx-auto w-fit font-semibold z-10 text-white backdrop-blur-3xl ${
                  dockAnimation ? "-top-6 text-[12px]" : "-top-10 text-[15px]"
                } opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <h1>{app.name}</h1>
              </div>
              <Image
                src={app.iconPath}
                alt={app.name}
                quality={100}
                width={BASE_ICON_SIZE}
                height={BASE_ICON_SIZE}
                className="select-none pointer-events-none"
              />
              <AnimatePresence>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale:
                      apps[app.name]?.isOpen || apps[app.name]?.isMinimized
                        ? 1
                        : 0,
                  }}
                  exit={{ scale: 0 }}
                  className="mx-auto w-1.5 h-1.5 mb-1 bg-black/70 rounded-full"
                />
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
