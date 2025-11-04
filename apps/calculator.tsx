import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";
import { useState } from "react";
import { evaluate } from "mathjs";

interface NoteAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function CalculatorApp({ buttonPosition }: NoteAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Calculator"];
  const calculatorSpecs = [
    { name: "AC" },
    { name: "+/-" },
    { name: "%" },
    { name: "÷" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "x" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "-" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "+" },
    { name: "0" },
    { name: "." },
    { name: "=" },
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
      <main className=" w-full h-full bg-zinc-400  pt-10 border-none">
        <section className="h-16">
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
            const isOperator = ["x", "-", "+", "÷", "="].includes(btn.name);
            return (
              <button
                key={btn.name}
                onClick={() => {
                  setValue((prev) => {
                    if (btn.name === "AC") {
                      return "0";
                    } else if (btn.name === "+/-") {
                      if (prev === "0") return prev;
                      return (parseFloat(prev) * -1).toString();
                    } else if (btn.name === "%") {
                      return (parseFloat(prev) / 100).toString();
                    } else if (btn.name === "=") {
                      try {
                        const sanitizedExpression = prev
                          .replace(/x/g, "*")
                          .replace(/÷/g, "/");
                        const result = evaluate(sanitizedExpression);
                        return result.toString();
                      } catch {
                        return "Error";
                      }
                    } else {
                      if (prev === "0") {
                        return btn.name;
                      } else {
                        return prev + btn.name;
                      }
                    }
                  });
                }}
                className={`${
                  isOperator
                    ? "bg-amber-500/90 hover:bg-amber-500/70 active:bg-amber-500/80"
                    : "bg-zinc-500/40 hover:bg-zinc-500/60 active:bg-zinc-500/80 "
                } ${
                  btn.name === "0" && "col-span-2"
                } p-4 text-2xl font-medium border border-zinc-500/70 cursor-pointer`}
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
