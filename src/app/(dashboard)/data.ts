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
  // FileText,
  // Bug,
  TestTube,
  Cog,
  Cable,
  // Home,
  // Search,
  Ruler,
  GitGraphIcon,
  FileBarChart2,
  FileText,
} from "lucide-react";

import { DropdownMenuType, SidebarItemType } from "@/lib/types";

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
      // {
      //   title: "Home",
      //   url: "/home",
      //   icon: Home,
      // },
      {
        title: "Search",
        url: "/search",
        icon: Headset,
        menuSubItems: [
          {
            title: "Data Audit",
            url: "/data-audit",
            icon: FileBarChart2,
          },
          {
            title: "Chatbot",
            url: "/chatbot",
            icon: Headset,
          },
          // {
          //   title: "Graph",
          //   url: "/graph",
          //   icon: GitGraphIcon,
          // },
        ],
      },
      {
        title: "Entities",
        url: "/entities",
        icon: Users,
      },
      {
        title: "Relationships",
        url: "/relationships",
        icon: Cable,
      },
      // {
      //   title: "Data Layout",
      //   url: "/data-layout",
      //   icon: FileText,
      // },
      {
        title: "Maps",
        url: "/maps",
        icon: TestTube,
      },
      // {
      //   title: "Compliance Rules",
      //   url: "/compliance-rules",
      //   icon: Ruler,
      // },
      // {
      //   title: "Anomaly Audit",
      //   url: "/anomaly",
      //   icon: Bug,
      // },

      {
        title: "NLP",
        url: "/nlp",
        icon: Cog,
      },
      {
        title: "Account",
        url: "/account",
        icon: Settings,
      },
      {
        title: "Support",
        url: "/support",
        icon: Headset,
        menuSubItems: [
          {
            title: "Contact Support",
            url: "/support",
            icon: Headset,
          },
          {
            title: "APIs",
            url: "/apis",
            icon: Code,
          },
        ],
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
