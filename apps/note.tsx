import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";
import { useState } from "react";

interface NoteAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function NoteApp({ buttonPosition }: NoteAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Notes"];
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppHandler
      standardWidth={600}
      standardHeight={400}
      isOverLayed={false}
      navigateBarBGColor="bg-white"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isSearchBar={true}
      navigateBarBorder={true}
      buttonPosition={buttonPosition}
      isMinimized={app?.isMinimized || false}
      onRestore={() => restoreApp("Notes")}
      onClose={() => closeApp("Notes")}
      onMinimize={() => minimizeApp("Notes")}
      appName="Notes"
    >
      <div className=" w-full h-full bg-white p-4 pt-10 border-none overflow-auto">
        <h2 className=" text-2xl font-semibold mb-4">My Notes</h2>
        {searchValue && (
          <p className=" mb-2 text-sm text-zinc-500">
            Searching for: {searchValue}
          </p>
        )}
        <p>This is where your notes would be displayed.</p>
      </div>
    </AppHandler>
  );
}
