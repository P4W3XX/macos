import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";

interface NoteAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function NoteApp({ buttonPosition }: NoteAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Notes"];

  return (
    <AppHandler
      standardWidth={600}
      standardHeight={400}
      isOverLayed={false}
      navigateBarBGColor="bg-white"
      navigateBarBorder={true}
      buttonPosition={buttonPosition}
      isMinimized={app?.isMinimized || false}
      onRestore={() => restoreApp("Notes")}
      onClose={() => closeApp("Notes")}
      onMinimize={() => minimizeApp("Notes")}
      isSearchBar={true}
      appName="Notes"
    >
      <div className=" w-full h-full bg-white p-4 pt-10 border-none overflow-auto">
        <h2 className=" text-2xl font-semibold mb-4">My Notes</h2>
      </div>
    </AppHandler>
  );
}
