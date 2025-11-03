interface AppConfig {
  name: string;
  iconPath: string;
  componentPath: string;
  isHidden: boolean;
  isOpen: boolean;
}

export const AppsConfig: Record<string, AppConfig> = {
  NoteApp: {
    name: "Notes",
    iconPath: "/appsIcons/note.svg",
    componentPath: "@/apps/note",
    isHidden: false,
    isOpen: false,
  },
  CalculatorApp: {
    name: "Calculator",
    iconPath: "/appsIcons/calculator.svg",
    componentPath: "@/apps/calculator",
    isHidden: false,
    isOpen: false,
  },
};

export const DockApps = [
  AppsConfig.NoteApp,
  AppsConfig.CalculatorApp,
];