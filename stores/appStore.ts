import { create } from 'zustand';
import { AppsConfig } from '../AppsConfig';

interface App {
  name: string;
  iconPath: string;
  componentPath: string;
  isOpen: boolean;
  isMinimized: boolean;
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
}

export const useAppStore = create<AppStore>((set) => ({
  apps: {
    [AppsConfig.NoteApp.name]: {
      ...AppsConfig.NoteApp,
      isMinimized: false,
    },
  },
  toggleApp: (appName) =>
    set((state) => ({
      apps: {
        ...state.apps,
        [appName]: {
          ...state.apps[appName],
          isOpen: !state.apps[appName].isOpen,
        },
      },
    })),
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
    set((state) => ({
      apps: {
        ...state.apps,
        [appName]: {
          ...state.apps[appName],
          isOpen: false,
          isMinimized: false,
        },
      },
    })),
  positions: {},
  setPosition: (appName, pos) =>
    set((state) => ({
      positions: {
        ...state.positions,
        [appName]: pos,
      },
    })),
  windowPositions: {},
  setWindowPosition: (appName, pos) =>
    set((state) => ({
      windowPositions: {
        ...state.windowPositions,
        [appName]: pos,
      },
    })),
}));