import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "BUSINESSES",
    items: [
      {
        href: "/perp",
        icon: "logo",
        title: "PERP",
      },
      {
        href: "/serp",
        icon: "layer2",
        title: "SERP",
      },
      {
        href: "/registry",
        icon: "layer",
        title: "REGISTRY",
      },
      {
        href: "/org",
        icon: "squareStack",
        title: "ORG",
        
      },
      {
        href: "/cu",
        icon: "shapes",
        title: "CONSUMER UNIT",
        
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
        
      },
      {
        href: "/channels/sms",
        icon: "sms",
        title: "SMS",
        
      },
      {
        href: "/channels/rcs",
        icon: "rcs",
        title: "RCS",
        
      },
      {
        href: "/channels/voice",
        icon: "voice",
        title: "Voice",
        
      },
      {
        href: "/channels/email",
        icon: "email",
        title: "E-mail",
        
      },

      {
        href: "/dashboard/serpList",
        icon: "logo",
        title: "SERP",
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
        disabled: true,
      },
    ],
  },
];
