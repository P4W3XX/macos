"use client";

import { Minimize2, X, Maximize2, Minus } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import { useAppStore } from "../stores/appStore";

export default function AppHandler({
  standardWidth = 800,
  standardHeight = 600,
  children,
  isOverLayed,
  buttonPosition,
  isMinimized = false,
  navigateBarBGColor,
  onRestore,
  onClose,
  onMinimize,
  isSearchBar,
  navigateBarBorder,
  appName,
}: {
  standardWidth?: number;
  standardHeight?: number;
  navigateBarBorder?: boolean;
  isOverLayed?: boolean;
  navigateBarBGColor?: string;
  isSearchBar?: boolean;
  children?: React.ReactNode;
  buttonPosition?: { x: number; y: number };
  isMinimized?: boolean;
  onRestore?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  appName?: string;
}) {
  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedHovered, setIsExpandedHovered] = useState(false);
  const [isHideHovered, setIsHideHovered] = useState(false);
  const { windowPositions, setWindowPosition } = useAppStore();
  const [isTyping, setIsTyping] = useState(false);
  const motionRef = useRef<HTMLDivElement>(null);
  const initialX =
    typeof window !== "undefined" && buttonPosition
      ? buttonPosition.x - window.innerWidth / 2
      : 0;
  const initialY =
    typeof window !== "undefined" && buttonPosition
      ? buttonPosition.y - window.innerHeight / 2
      : 0;
  const windowPos = windowPositions[appName || ""];
  const targetX = isExpanded
    ? 0
    : isMinimized
    ? initialX
    : windowPos
    ? windowPos.x
    : 0;
  const targetY = isExpanded
    ? 0
    : isMinimized
    ? initialY
    : windowPos
    ? windowPos.y
    : 0;
  const currentWidth = isExpanded ? window.innerWidth : standardWidth;
  const currentHeight = isExpanded ? window.innerHeight : standardHeight;
  const dragConstraints = {
    left: -window.innerWidth / 2 + currentWidth / 2,
    top: -window.innerHeight / 2 + currentHeight / 2,
    right: window.innerWidth / 2 - currentWidth / 2,
    bottom: window.innerHeight / 2 - currentHeight / 2,
  };
  return (
    <motion.main
      initial={{
        width: isExpanded ? "100%" : standardWidth,
        height: isExpanded ? "100%" : standardHeight,
        x: initialX,
        y: initialY,
        scale: buttonPosition ? 0 : 1,
        opacity: buttonPosition ? 0 : 1,
      }}
      animate={{
        width: isExpanded ? "100%" : standardWidth,
        height: isExpanded ? "100%" : standardHeight,
        x: targetX,
        y: targetY,
        scale: isMinimized ? 0 : 1,
        opacity: isMinimized ? 0 : 1,
        borderRadius: isExpanded ? 0 : 24,
      }}
      exit={{
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.1 },
      }}
      transition={{
        duration: 0.2,
        type: "tween",
      }}
      drag
      dragConstraints={dragConstraints}
      ref={motionRef}
      onDragEnd={() => {
        if (motionRef.current && appName) {
          const rect = motionRef.current.getBoundingClientRect();
          setWindowPosition(appName, {
            x: rect.left + rect.width / 2 - window.innerWidth / 2,
            y: rect.top + rect.height / 2 - window.innerHeight / 2,
          });
        }
      }}
      onClick={isMinimized ? onRestore : undefined}
      className=" bg-black absolute bg-clip-padding z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform shadow-[0_0_30px_10px_rgba(0,0,0,0.25)] border border-zinc-400 touch-none rounded-3xl overflow-hidden select-none"
    >
      <div
        className={` p-3 ${!isOverLayed && navigateBarBGColor} ${
          isOverLayed ? "absolute top-0 select-none touch-none left-0 border-none w-full" : "relative"
        }`}
        style={
          navigateBarBorder ? { borderBottom: "1px solid rgba(0,0,0,0.1)" } : {}
        }
      >
        <div className=" w-full flex gap-x-2 select-none touch-none border-none ">
          <div
            onMouseEnter={() => setIsCloseHovered(true)}
            onMouseLeave={() => setIsCloseHovered(false)}
            onClick={onClose}
            className=" size-4 bg-[#FF5F57] border border-black/20 rounded-full flex items-center justify-center cursor-pointer"
          >
            {isCloseHovered && (
              <X strokeWidth={3} className=" size-3 font-black text-black" />
            )}
          </div>
          <div
            onMouseEnter={() => setIsExpandedHovered(true)}
            onMouseLeave={() => setIsExpandedHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            className=" size-4 bg-[#FEBC2E] rounded-full border border-black/20 flex items-center justify-center"
          >
            {isExpandedHovered &&
              (isExpanded ? (
                <Minimize2
                  strokeWidth={3}
                  className=" size-2.5 font-black text-black"
                />
              ) : (
                <Maximize2
                  strokeWidth={3}
                  className=" size-2.5 font-black text-black"
                />
              ))}
          </div>
          <div
            className=" size-4 bg-[#28C840] border border-black/20 rounded-full flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHideHovered(true)}
            onMouseLeave={() => setIsHideHovered(false)}
            onClick={onMinimize}
          >
            {isHideHovered && (
              <Minus
                strokeWidth={3}
                className=" size-2.5 font-black text-black"
              />
            )}
          </div>
        </div>
        {isSearchBar && (
          <div className=" pt-3 flex select-none touch-none">
            <motion.input
              animate={{
                marginRight: !isTyping ? 0 : 10,
              }}
              type="text"
              placeholder="Search..."
              className="w-full p-1 border text-black placeholder:text-zinc-400 font-semibold text-sm px-2 border-zinc-300 rounded-lg"
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
            <motion.button
              animate={{
                width: !isTyping ? 0 : "auto",
                opacity: isTyping ? 1 : 0,
              }}
              className=" text-blue-500 font-medium"
            >
              Cancel
            </motion.button>
          </div>
        )}
      </div>
      {children}
    </motion.main>
  );
}
