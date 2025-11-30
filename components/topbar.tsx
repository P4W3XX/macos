import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "../stores/appStore";
import { AppsConfig } from "../AppsConfig";
import Image from "next/image";

export default function Topbar() {
  const [time, setTime] = useState(new Date());
  const { zIndexes, apps, closeApp } = useAppStore();
  const [currentDropdown, setCurrentDropdown] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const activeAppName = Object.keys(zIndexes).reduce(
    (max, app) => (zIndexes[app] > (zIndexes[max] || 0) ? app : max),
    ""
  );

  console.log("Active App Name:", activeAppName);
  console.log("zIndexes:", zIndexes);
  const activeApp =
    activeAppName && apps[activeAppName]?.isOpen ? apps[activeAppName] : null;

  return (
    <div className=" w-full h-7 bg-white/50 flex items-center px-2 backdrop-blur-3xl justify-between">
      <div className=" flex gap-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer font-bold data-[state=open]:bg-white/50 px-3 rounded-sm">
            <svg
              fill="#000"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer data-[state=open]:bg-white/50 rounded-sm px-3 font-bold">
            {activeApp ? activeApp.name : "Finder"}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            {activeApp ? (
              <>
                <DropdownMenuItem>About {activeApp.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                {activeApp.appOption?.map((option, index) => (
                  <DropdownMenuItem key={index} onClick={option.do}>
                    {option.name}
                    <span className="ml-auto text-xs text-black/30">
                      {option.shortcut}
                    </span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => closeApp(activeApp.name)}>
                  Quit {activeApp.name}
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>About Finder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                {AppsConfig.Finder.appOption?.map((option, index) => (
                  <DropdownMenuItem key={index} onClick={option.do}>
                    {option.name}
                    <span className="ml-auto text-xs text-black/30">
                      {option.shortcut}
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            File
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            Edit
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            Go
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            Window
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className=" cursor-pointer font-semibold data-[state=open]:bg-white/50 rounded-sm px-3">
            Help
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={10}
            className=" min-w-52"
          >
            <DropdownMenuItem>About</DropdownMenuItem>
            <DropdownMenuItem>Software Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
            <DropdownMenuItem>Restart</DropdownMenuItem>
            <DropdownMenuItem>Shut Down</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" flex gap-x-2">
        <h1 className=" text-black font-bold text-sm">
          {(() => {
            const weekday = time.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const monthDay = time.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            return `${weekday} ${monthDay}`;
          })()}
        </h1>
        <h1 className=" text-black font-bold text-sm">
          {(() => {
            let hours = time.getHours();
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            if (hours === 0) hours = 12;
            return `${hours.toString().padStart(2, "0")}:${time
              .getMinutes()
              .toString()
              .padStart(2, "0")} ${ampm}`;
          })()}
        </h1>
      </div>
    </div>
  );
}
