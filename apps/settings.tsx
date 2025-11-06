import AppHandler from "@/components/appHandler";
import { useAppStore } from "@/stores/appStore";
import { useState } from "react";
import AppearancePage from "@/components/settings/appearance";
import GeneralPage from "@/components/settings/general";

interface SettingsAppProps {
  buttonPosition?: { x: number; y: number };
}

export default function SettingsApp({ buttonPosition }: SettingsAppProps) {
  const { apps, restoreApp, closeApp, minimizeApp } = useAppStore();
  const app = apps["Settings"];
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppHandler
      standardWidth={1000}
      standardHeight={800}
      isOverLayed={true}
      navigateBarBGColor="bg-white"
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      isSearchBar={true}
      buttonPosition={buttonPosition}
      isSidebar={true}
      isMinimized={app?.isMinimized || false}
      onRestore={() => restoreApp("Settings")}
      defaultSidebarActiveItem="Sign In"
      sideBarItems={[
        {
          title: "Sign In",
          icon: "/profilePicture.svg",
          component: <div>Sign In Content</div>,
        },
        {
          title: "General",
          icon: "/general.png",
          component: <GeneralPage />,
        },
        {
          title: "Appearance",
          icon: "/appearance.png",
          component: <AppearancePage />,
        },
      ]}
      onClose={() => closeApp("Settings")}
      onMinimize={() => minimizeApp("Settings")}
      appName="Settings"
    >
      <div className=" w-full h-full bg-white p-4 pt-10 border-none overflow-auto">
        <h2 className=" text-2xl font-semibold mb-4">My Settings</h2>
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
