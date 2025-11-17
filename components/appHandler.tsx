"use client";

import { Minimize2, X, Maximize2, Minus } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import { useAppStore } from "../stores/appStore";
import { Search } from "lucide-react";
import Image from "next/image";

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
  searchValue,
  onSearchChange,
  onMinimize,
  isSearchBar,
  isSidebar,
  isSidebarSearchBar,
  sideBarSearchValue,
  onSideBarSearchChange,
  defaultSidebarActiveItem,
  sideBarItems,
  appName,
}: {
  standardWidth?: number;
  standardHeight?: number | string;
  isSidebar?: boolean;
  isSidebarSearchBar?: boolean;
  isOverLayed?: boolean;
  navigateBarBGColor?: string;
  isSearchBar?: boolean;
  defaultSidebarActiveItem?: string;
  children?: React.ReactNode;
  buttonPosition?: { x: number; y: number };
  isMinimized?: boolean;
  searchValue?: string;
  sideBarItems?: { title: string; icon: string; component: React.ReactNode }[];
  sideBarSearchValue?: string;
  onSideBarSearchChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  onRestore?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  appName?: string;
}) {
  const [isActionButtonHovered, setIsActionButtonHovered] =
    useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sideBarActiveItem, setSideBarActiveItem] = useState<string | null>(
    defaultSidebarActiveItem || null
  );
  const { windowPositions, setWindowPosition, zIndexes, bringToFront } =
    useAppStore();
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
        filter: "blur(30px)",
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
        filter: "blur(0px)",
      }}
      exit={{
        scale: 1.2,
        opacity: 0,
        filter: "blur(30px)",
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
      onClick={isMinimized ? onRestore : () => appName && bringToFront(appName)}
      className=" bg-black absolute bg-clip-padding top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_10px_rgba(0,0,0,0.25)] border border-white/20 touch-none rounded-3xl overflow-hidden select-none"
      style={{ zIndex: zIndexes[appName || ""] || 100 }}
    >
      <div
        className={` p-3 ${!isOverLayed && navigateBarBGColor} ${
          isOverLayed
            ? "absolute top-0 select-none touch-none left-0 border-none w-full"
            : "relative"
        }`}
      >
        <div className=" w-full flex gap-x-2 select-none touch-none border-none ">
          <div
            onMouseEnter={() => setIsActionButtonHovered(true)}
            onMouseLeave={() => setIsActionButtonHovered(false)}
            onClick={onClose}
            className=" size-4 bg-[#FF5F57] border border-black/20 rounded-full flex items-center justify-center cursor-pointer"
          >
            {isActionButtonHovered && (
              <X strokeWidth={3} className=" size-3 font-black text-black" />
            )}
          </div>
          <div
            onMouseEnter={() => setIsActionButtonHovered(true)}
            onMouseLeave={() => setIsActionButtonHovered(false)}
            onClick={onMinimize}
            className=" size-4 bg-[#FEBC2E] rounded-full border border-black/20 flex items-center justify-center"
          >
            {isActionButtonHovered && (
              <Minus
                strokeWidth={3}
                className=" size-2.5 font-black text-black"
              />
            )}
          </div>
          <div
            className=" size-4 bg-[#28C840] border border-black/20 rounded-full flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsActionButtonHovered(true)}
            onMouseLeave={() => setIsActionButtonHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isActionButtonHovered &&
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
        </div>
        {!isOverLayed && (
          <h1 className="text-black font-bold absolute top-2 right-0 left-0 mx-auto w-fit">
            {appName}
          </h1>
        )}
        {isSearchBar && !isOverLayed && (
          <div className=" pt-3 flex select-none relative touch-none">
            <Search
              size={16}
              className=" absolute left-1 top-4.5 text-zinc-400"
            />
            <motion.input
              animate={{
                marginRight: !isTyping ? 0 : 10,
              }}
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search..."
              className="w-full p-1 pl-6 bg-zinc-200 text-black placeholder:text-zinc-400 font-semibold text-sm px-2 rounded-lg"
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
            <motion.button
              animate={{
                width: !isTyping ? 0 : "auto",
                opacity: isTyping ? 1 : 0,
              }}
              onClick={() => onSearchChange?.("")}
              className=" text-blue-500 font-medium"
            >
              Cancel
            </motion.button>
          </div>
        )}
      </div>
      {isSidebar && (
      <div className=" flex h-full">
        <div
          className={` bg-zinc-100 overflow-hidden border-r px-3 ${
            isOverLayed ? "pt-10" : "pt-5"
          } max-w-[300px] min-w-[300px]`}
        >
          <div>
            <h1 className=" font-bold text-2xl">{appName}</h1>
            {isSidebarSearchBar && (
              <div className=" pt-2 flex select-none relative touch-none">
                <Search
                  size={16}
                  className=" absolute left-1 top-4 text-zinc-400"
                />
                <motion.input
                  animate={{
                    marginRight: !isTyping ? 0 : 10,
                  }}
                  type="text"
                  value={sideBarSearchValue}
                  onChange={(e) => onSideBarSearchChange?.(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-1 bg-zinc-200 h-8 pl-6 text-black placeholder:text-zinc-400 font-medium text-sm px-2 rounded-md"
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                />
                <motion.button
                  animate={{
                    width: !isTyping ? 0 : "auto",
                    opacity: isTyping ? 1 : 0,
                  }}
                  onClick={() => onSideBarSearchChange?.("")}
                  className=" text-blue-500 font-medium"
                >
                  Cancel
                </motion.button>
              </div>
            )}
          </div>
          {isSidebar && sideBarItems && (
            <div className=" mt-3 flex flex-col">
              {sideBarItems &&
                sideBarItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSideBarActiveItem(item.title)}
                    className={`w-full text-left flex h-10 items-center p-2 rounded-lg  ${
                      sideBarActiveItem === item.title
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={30}
                      height={30}
                      quality={100}
                      className=" mr-2"
                    />
                    <h1
                      className={
                        sideBarActiveItem === item.title
                          ? "font-normal"
                          : "font-medium"
                      }
                    >
                      {item.title}
                    </h1>
                  </button>
                ))}
            </div>
          )}
        </div>
        {isSidebar && sideBarItems && sideBarActiveItem ? (
          <div className=" flex-1 overflow-auto w-full bg-white z-10">
            {
              sideBarItems.find((item) => item.title === sideBarActiveItem)
                ?.component
            }
          </div>
        ) : (
          children
        )}
      </div>
      )}
      {!isSidebar && children}
    </motion.main>
  );
}
