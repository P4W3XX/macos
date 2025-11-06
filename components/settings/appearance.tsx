import { Switch } from "../ui/switch";
import useAppearanceSettings from "@/stores/settingsStore";
import Image from "next/image";

export default function AppearancePage() {
  const { dockAnimation, setDockAnimation } = useAppearanceSettings();
  return (
    <div className=" w-full p-4">
      <div className=" bg-zinc-100 border items-center rounded-lg w-full flex flex-col justify-center mb-6 p-4">
        <Image
          src="/appearance.png"
          alt="Appearance"
          width={800}
          height={800}
          className=" rounded-lg size-24"
        />
        <h1 className=" font-bold text-2xl my-1">
          Appearance
        </h1>
        <p className=" text-black/50 font-medium max-w-[80%]">
          Customize the look and feel of your system with appearance settings.
        </p>
      </div>
      <div className=" w-full h-fit bg-zinc-100 rounded-lg border">
        <div className=" flex w-full justify-between items-center py-2 px-3">
          <h1 className=" font-medium text-[15px]">Dock Animation</h1>
          <Switch checked={dockAnimation} onCheckedChange={setDockAnimation} />
        </div>
      </div>
    </div>
  );
}
