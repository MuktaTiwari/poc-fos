import { SidebarNavItem } from "types"; // Revert import

export const sidebarLinks: SidebarNavItem[] = [ // Revert type
  {
    title: undefined,
    items: [
      {
        href: "/dashboard",
        icon: "logo",
        title: "Dashboard",
      }
    ],
  },
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
    title: undefined,
    items: [
      {
        href: "#",
        icon: "user",
        // Shorter title to fit the space
        title: "Users & Permissions", 
        children: [
          { href: "/dashboard/user-management/role-type", title: "Role & Permission",icon:"shieldcheck" },
          { href: "/dashboard/user-management/all-admins", title: "Users",icon:"user" },
        ],
      },
      {
        href: "#",
        icon: "settings",
        title: "Profile",
        children: [
          { href: "/auth/myprofile", title: "My Profile", icon:"user" },
          { href: "/auth/change-password", title: "Change Password" ,icon:"lock"},
          { href: "/auth/two-factor-authentication", title: "Two-Factor Authentication" ,icon:"shield"},
        ],
      }
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
