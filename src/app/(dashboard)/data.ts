import {
  Activity,
  BadgeAlert,
  Blocks,
  ChartLine,
  ChartNoAxesCombined,
  CircleUserRound,
  CloudAlert,
  Combine,
  ExternalLink,
  FileText,
  Headset,
  HeartPulse,
  House,
  Library,
  LogOut,
  Mails,
  MessageCircleQuestion,
  ScreenShare,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SquareTerminal,
  Star,
  Key,
  Trophy,
  User,
  Waypoints,
  Heart
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
        title: "Monitors",
        url: "/monitors",
        icon: ScreenShare,
      },
      {
        title: "Entities",
        url: "/entities",
        icon: Heart,
      },
      {
        title: "NLP",
        url: "/nlp",
        icon: ScreenShare,
      },
      {
        title: "Anomaly",
        url: "/anomaly",
        icon: ScreenShare,
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

