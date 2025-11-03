import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";
import { useState } from "react";

interface NoteAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function CalculatorApp({ buttonPosition }: NoteAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Calculator"];
  const calculatorSpecs = [
    { name: "AC", function: () => {} },
    { name: "+/-", function: () => {} },
    { name: "%", function: () => {} },
    { name: "÷", function: () => {} },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "x", function: () => {} },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "-", function: () => {} },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "+", function: () => {} },
    { name: "0" },
    { name: "." },
    { name: "=", function: () => {} },
  ];

  const [value, setValue] = useState<string>("0");

  return (
    <AppHandler
      standardWidth={320}
      standardHeight={430}
      isOverLayed={true}
      navigateBarBGColor="bg-gray-200"
      navigateBarBorder={false}
      buttonPosition={buttonPosition}
      isMinimized={app?.isMinimized || false}
      onRestore={() => restoreApp("Calculator")}
      onClose={() => closeApp("Calculator")}
      onMinimize={() => minimizeApp("Calculator")}
      appName="Calculator"
    >
      <main className=" w-full h-full bg-zinc-400  pt-10 border-none w-full h-full">
        <section className="h-[4rem]">
          <input
            className="text-bottom text-6xl font-semibold w-full h-full text-right px-2"
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setValue(value); 
              }
            }}
            value={value}
          ></input>
        </section>
        <aside className="w-full grid-cols-4 grid ">
          {calculatorSpecs.map((btn) => {
            const isOperator = ["x", "-", "+","÷","="].includes(btn.name);
            return (
              <button
                key={btn.name}
                onClick={btn?.function}
                className={`${isOperator ? "bg-amber-500/90 hover:bg-amber-500/70 active:bg-amber-500/80":"bg-zinc-500/40 hover:bg-zinc-500/60 active:bg-zinc-500/80 "} ${btn.name==="0" && "col-span-2"} p-4 text-2xl font-medium border border-zinc-500/70 cursor-pointer`}
              >
                {btn.name}
              </button>
            );
          })}
        </aside>
      </main>
    </AppHandler>
  );
}
