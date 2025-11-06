
import {create} from "zustand";

interface AppearanceSettings {
    dockAnimation: boolean;
    setDockAnimation: (value: boolean) => void;
}

const useAppearanceSettings = create<AppearanceSettings>((set) => ({
    dockAnimation: true,
    setDockAnimation: (value) => set({ dockAnimation: value }),
}));

export default useAppearanceSettings;
