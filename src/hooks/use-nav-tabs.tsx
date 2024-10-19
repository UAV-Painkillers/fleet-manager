import { DroneBlackIcon, DroneWhiteIcon } from "@/components/icons/drone-icon";
import { usePathnameIsActive } from "@/hooks/use-pathname-is-active";
import {
  ScanFaceIcon,
  BatteryMediumIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export interface NavTab {
  pathname: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
}

export function useNavTabs(isAuthenticated: boolean) {
  const pathnameIsActive = usePathnameIsActive();
  const { resolvedTheme } = useTheme();

  const allTabs: NavTab[] = useMemo(
    () => [
      {
        pathname: "/pilot-id",
        label: "Pilot ID",
        icon: ScanFaceIcon,
      },
      {
        pathname: "/drones",
        label: "Drones",
        icon: resolvedTheme === "dark" ? DroneBlackIcon : DroneWhiteIcon,
      },
      {
        pathname: "/batteries",
        label: "Parts",
        icon: BatteryMediumIcon,
      },
      isAuthenticated
        ? {
            pathname: "/auth/logout",
            label: "Logout",
            icon: LogOutIcon,
            isActive: false,
          }
        : {
            pathname: "/auth/login",
            label: "Login",
            icon: LogInIcon,
            isActive: true,
          },
    ],
    [isAuthenticated, resolvedTheme]
  );

  const tabsWithActiveState: (NavTab & { isActive: boolean })[] =
    useMemo(() => {
      return allTabs.map((tab) => ({
        ...tab,
        isActive: tab.isActive || pathnameIsActive(tab.pathname),
      }));
    }, [pathnameIsActive, allTabs]);

  const activeTab = useMemo(() => {
    return tabsWithActiveState.find((tab) => tab.isActive);
  }, [tabsWithActiveState]);

  return {
    tabs: tabsWithActiveState,
    activeTab,
  };
}
