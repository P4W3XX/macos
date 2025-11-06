interface AppConfig {
  name: string;
  iconPath: string;
  componentPath: string;
  isOpen: boolean;
  appOption?: { name: string; do: () => void; shortcut: string }[];
}

export const AppsConfig: Record<string, AppConfig> = {
  NoteApp: {
    name: "Notes",
    iconPath: "/appsIcons/note.svg",
    componentPath: "@/apps/note",
    isOpen: false,
    appOption: [
      {
        name: "New Note",
        do: () => {
          console.log("New Note");
        },
        shortcut: "⌘ N",
      },
      {
        name: "Delete Note",
        do: () => {
          console.log("Delete Note");
        },
        shortcut: "⌘ D",
      },
    ],
  },
  Finder: {
    name: "Finder",
    iconPath: "/appsIcons/finder.svg",
    componentPath: "@/apps/finder",
    isOpen: false,
    appOption: [
      {
        name: "New Finder Window",
        do: () => {
          console.log("New Finder Window");
        },
        shortcut: "⌘ N",
      },
      {
        name: "Open",
        do: () => {
          console.log("Open");
        },
        shortcut: "⌘ O",
      },
      {
        name: "Duplicate",
        do: () => {
          console.log("Duplicate");
        },
        shortcut: "⌘ D",
      },
    ],
  },
  CalculatorApp: {
    name: "Calculator",
    iconPath: "/appsIcons/calculator.svg",
    componentPath: "@/apps/calculator",
    isOpen: false,
    appOption: [
      {
        name: "Basic Calculator",
        do: () => {
          console.log("Basic Calculator");
        },
        shortcut: "⌘ B",
      },
      {
        name: "Scientific Calculator",
        do: () => {
          console.log("Scientific Calculator");
        },
        shortcut: "⌘ S",
      },
    ],
  },
  Settings: {
    name: "Settings",
    iconPath: "/appsIcons/settings.svg",
    componentPath: "@/apps/settings",
    isOpen: false,
    appOption: [
      {
        name: "General",
        do: () => {
          console.log("General");
        },
        shortcut: "⌘ G",
      },
      {
        name: "Privacy",
        do: () => {
          console.log("Privacy");
        },
        shortcut: "⌘ P",
      },
    ],
  },
};

export const DockApps = [
  AppsConfig.Finder,
  AppsConfig.NoteApp,
  AppsConfig.CalculatorApp,
  AppsConfig.Settings,
];
