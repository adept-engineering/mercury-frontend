import {
  Activity,
  CircleUserRound,
  Headset,
  Users,
  LogOut,
  Settings,
  SquareTerminal,
  Star,
  Key,
  User,
  Code,
  FileText,
  Bug,
  TestTube,
  Cog
} from "lucide-react";

import {
  DropdownMenuType,
  SidebarItemType,
} from "@/lib/types";

export const dropdownMenu: DropdownMenuType[] = [
  {
    id: 1,
    title: "Profile",
    icon: User,
    link: "/settings/profile",
  },
  {
    id: 2,
    title: "Activity",
    icon: Activity,
    link: "/settings/activity",
  },
];

export const sidebarItems: SidebarItemType[] = [
  {
    id: 1,
    menuItems: [
      {
        title: "APIs",
        url: "/apis",
        icon: Code,
      },
      {
        title: "Entities",
        url: "/entities",
        icon: Users,
      },
      {
        title: "Process Log",
        url: "/process-log",
        icon: FileText,
      },
      {
        title: "Anomaly Log",
        url: "/anomaly",
        icon: Bug,
      },
      {
        title: "NLP Config",
        url: "/nlp",
        icon: Cog,
      },
      {
        title: "Perform A Test",
        url: "/test",
        icon: TestTube,
      },
      {
        title: "Account",
        url: "/settings/profile",
        icon: Settings,
      },
      {
        title: "Support",
        url: "/support",
        icon: Headset,
      },
      {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
        islogout: true,
      },
    ],
  },
];

export const settingsTabsTrigger = [
  {
    id: 1,
    value: "profile",
    label: "Profile",
    icon: CircleUserRound,
  },
  {
    id: 2,
    value: "naics-code",
    label: "NAICS Code",
    icon: SquareTerminal,
  },
  {
    id: 3,
    value: "ratings",
    label: "Ratings",
    icon: Star,
  },
  {
    id: 4,
    value: "security",
    label: "Security",
    icon: Key,
  },
];

