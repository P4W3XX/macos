"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className=" pt-3 flex relative select-none w-[300px] touch-none">
      <Search size={16} className=" absolute left-1 top-4.5 text-zinc-400" />
      <motion.input
        initial={{ marginRight: 0 }}
        animate={{
          marginRight: !isTyping ? 0 : 10,
        }}
        type="text"
        placeholder="Search..."
        className=" p-1 border bg-white pl-6 w-full text-black placeholder:text-zinc-400 font-semibold text-sm px-2 border-zinc-300 rounded-lg"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <motion.button
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: !isTyping ? 0 : "auto",
          opacity: isTyping ? 1 : 0,
        }}
        className=" text-blue-500 font-medium"
      >
        Cancel
      </motion.button>
    </div>
  );
}
