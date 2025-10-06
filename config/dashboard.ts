import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "BUSINESSES",
    items: [
      {
        href: "/perp",
        icon: "logo",
        title: "PERP",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/serp",
        icon: "layer2",
        title: "SERP",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/registry-list",
        icon: "layer",
        title: "REGISTRY",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/org",
        icon: "squareStack",
        title: "ORG",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/cu",
        icon: "shapes",
        title: "CONSUMER UNIT",
        authorizeOnly: UserRole.ADMIN,
      },
    ],
  },
  {
    title: "CHANNELS",
    items: [
      {
        href: "/channels/whatsapp",
        icon: "whatsApp",
        title: "WhatsApp",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/channels/sms",
        icon: "sms",
        title: "SMS",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/channels/rcs",
        icon: "rcs",
        title: "RCS",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/channels/voice",
        icon: "voice",
        title: "Voice",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/channels/email",
        icon: "email",
        title: "E-mail",
        authorizeOnly: UserRole.ADMIN,
      },

      {
        href: "/dashboard/serpList",
        icon: "logo",
        title: "SERP",
        authorizeOnly: UserRole.USER,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
