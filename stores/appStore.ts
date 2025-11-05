import { create } from "zustand";
import { AppsConfig } from "../AppsConfig";

interface App {
  name: string;
  iconPath: string;
  componentPath: string;
  isOpen: boolean;
  isMinimized: boolean;
  appOption?: { name: string; do: () => void; shortcut: string }[];
}

interface AppStore {
  apps: Record<string, App>;
  toggleApp: (appName: string) => void;
  minimizeApp: (appName: string) => void;
  restoreApp: (appName: string) => void;
  closeApp: (appName: string) => void;
  positions: Record<string, { x: number; y: number }>;
  setPosition: (appName: string, pos: { x: number; y: number }) => void;
  windowPositions: Record<string, { x: number; y: number }>;
  setWindowPosition: (appName: string, pos: { x: number; y: number }) => void;
  zIndexes: Record<string, number>;
  bringToFront: (appName: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  apps: {
    [AppsConfig.NoteApp.name]: {
      ...AppsConfig.NoteApp,
      isMinimized: false,
    },
    [AppsConfig.CalculatorApp.name]: {
      ...AppsConfig.CalculatorApp,
      isMinimized: false,
    },
    [AppsConfig.Finder.name]: {
      ...AppsConfig.Finder,
      isMinimized: false,
    },
  },
  toggleApp: (appName) =>
    set((state) => {
      const isOpening = !state.apps[appName].isOpen;
      const newApps = {
        ...state.apps,
        [appName]: {
          ...state.apps[appName],
          isOpen: !state.apps[appName].isOpen,
        },
      };
      const newZIndexes = isOpening
        ? {
            ...state.zIndexes,
            [appName]: Math.max(...Object.values(state.zIndexes), 100) + 1,
          }
        : state.zIndexes;
      return { ...state, apps: newApps, zIndexes: newZIndexes };
    }),
  minimizeApp: (appName) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [appName]: {
          ...state.apps[appName],
          isMinimized: true,
        },
      },
    })),
  restoreApp: (appName) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [appName]: {
          ...state.apps[appName],
          isMinimized: false,
        },
      },
    })),
  closeApp: (appName) =>
    set((state) => {
      const newZIndexes = { ...state.zIndexes };
      console.log("Closing app:", appName);
      delete newZIndexes[appName];
      console.log("Updated zIndexes:", newZIndexes);
      console.log("App store state before closing:", state);
      return {
        ...state,
        apps: {
          ...state.apps,
          [appName]: {
            ...state.apps[appName],
            isOpen: false,
            isMinimized: false,
          },
        },
        zIndexes: newZIndexes,
      };
    }),
  positions: {},
  setPosition: (appName, pos) =>
    set((state) => ({
      ...state,
      positions: {
        ...state.positions,
        [appName]: pos,
      },
    })),
  windowPositions: {},
  setWindowPosition: (appName, pos) =>
    set((state) => ({
      ...state,
      windowPositions: {
        ...state.windowPositions,
        [appName]: pos,
      },
    })),
  zIndexes: {},
  bringToFront: (appName) =>
    set((state) => {
      const currentZIndexes = Object.values(state.zIndexes);
      const maxZ =
        currentZIndexes.length > 0 ? Math.max(...currentZIndexes) : 100;
      return {
        ...state,
        zIndexes: {
          ...state.zIndexes,
          [appName]: maxZ + 1,
        },
      };
    }),
}));
