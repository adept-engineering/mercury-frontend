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
        title: "Home",
        url: "/home",
        icon: House,
      },
      // {
      //   title: "Awards",
      //   url: "/awards",
      //   icon: Trophy,
      // },
      {
        title: "Opportunities",
        url: "#",
        icon: ExternalLink,
        menuSubItems: [
          {
            title: "SAM",
            // url: "/chat/sam",
            url: "/sam",
            icon: ScreenShare,
          },
          {
            title: "eBuy",
            url: "/ebuy",
            icon: ShoppingBag,
          },
          {
            title: "Custom",
            url: "/custom",
            icon: Waypoints,
          },
        ],
      },
      // {
      //   title: "Forecasts",
      //   url: "/forecasts",
      //   icon: ChartNoAxesCombined,
      // },
      {
        title: "Settings",
        url: "/settings/profile",
        icon: Settings,
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

