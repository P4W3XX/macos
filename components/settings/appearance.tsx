import { Switch } from "../ui/switch";
import useAppearanceSettings from "@/stores/settingsStore";
import Image from "next/image";

export default function AppearancePage() {
  const { dockAnimation, setDockAnimation } = useAppearanceSettings();
  return (
    <div className=" w-full p-4">
      <div className=" w-full h-fit bg-zinc-100 rounded-lg border">
        <div className=" flex w-full justify-between items-center py-2 px-3">
          <h1 className=" font-medium text-[15px]">Dock Animation</h1>
          <Switch checked={dockAnimation} onCheckedChange={setDockAnimation} />
        </div>
      </div>
    </div>
  );
}
