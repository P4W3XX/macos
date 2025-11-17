import Image from "next/image";
import {
  MdOutlineNavigateNext,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GeneralPage() {
  const settings = [
    { name: "About", icon: "/macbook.png" },
    { name: "Software Update", icon: "/general.png" },
    { name: "Storage", icon: "/storage.png" },
  ];
  const setting2 = [
    { name: "AutoFill & Passwords", icon: "/autofill.png" },
    { name: "Date & Time", icon: "/datetime.png" },
    { name: "Language & Region", icon: "/language.png" },
  ];
  const specialSettings = [
    { name: "Apple Care & Warranty", icon: "/healthcare.png" },
    { name: "AirDrop & Handoff", icon: "/airdrop.png" },
  ];

  const [currentSetting, setCurrentSetting] = useState<string | null>(null);

  if (currentSetting === null) {
    return (
      <main className=" w-full p-4">
        <div className=" bg-zinc-100 border items-center rounded-lg w-full flex flex-col justify-center mb-6 p-4">
          <Image
            src="/general.png"
            alt="General"
            width={800}
            height={800}
            className=" rounded-lg size-24"
          />
          <h1 className=" font-bold text-2xl my-1">General</h1>
          <p className=" text-black/50 font-medium max-w-[80%]">
            Manage your general system settings and preferences.
          </p>
        </div>
        <motion.nav
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-100 border rounded-lg w-full flex flex-col"
        >
          {settings.map((setting, index) => (
            <div
              className={`flex flex-col hover:bg-zinc-200 rounded-lg pt-3 px-3 cursor-pointer ${
                index == settings.length - 1 && "pb-3"
              }`}
              key={setting.name}
              onClick={() => setCurrentSetting(setting.name)}
            >
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <Image
                    src={setting.icon}
                    alt={setting.name}
                    width={30}
                    height={30}
                    className="bg-zinc-300 rounded-lg size-9 mr-4 p-1"
                  />
                  <p className="text-lg font-medium">{setting.name}</p>
                </div>
                <MdOutlineNavigateNext className="text-black/40 size-8" />
              </div>
              <hr
                className={`${
                  index < settings.length - 1 ? "block" : "hidden"
                } border-zinc-200 mt-2 mx-2`}
              />
            </div>
          ))}
        </motion.nav>

        {specialSettings.map((setting) => (
          <div
            key={setting.name}
            className="flex flex-row items-center justify-between bg-zinc-100 border rounded-lg w-full mt-3 p-3 hover:bg-zinc-200 cursor-pointer"
            onClick={() => setCurrentSetting(setting.name)}
          >
            <div className="flex flex-row items-center">
              <Image
                src={setting.icon}
                alt={setting.name}
                width={20}
                height={20}
                className="size-9 mr-2"
              />
              <p className=" text-lg font-medium">{setting.name}</p>
            </div>
            <MdOutlineNavigateNext className="text-black/40 size-8" />
          </div>
        ))}
      </main>
    );
  } else {
    return (
      <motion.main
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className=" w-full p-4"
      >
        <MdOutlineKeyboardArrowLeft
          className="text-blue-500 size-10"
          onClick={() => setCurrentSetting(null)}
        />
        P1W3XX
      </motion.main>
    );
  }
}
