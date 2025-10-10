"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, SidebarNavItem } from "@/types";
import { Menu, PanelLeftClose, PanelRightClose } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { Icons } from "@/components/shared/icons";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

interface SidebarItemProps {
  item: NavItem;
  path: string;
  isSidebarExpanded: boolean;
}

function SidebarItem({ item, path, isSidebarExpanded }: SidebarItemProps) {
  const Icon = Icons[item.icon || "arrowRight"];
  const [open, setOpen] = useState(false);

  return (
    <div key={item.title}>
      {/* If item has children => collapsible */}
      {item.children ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
              "text-muted-foreground hover:text-accent-foreground",
            )}
          >
            <Icon className="size-5" />
            {isSidebarExpanded && item.title}
            {isSidebarExpanded && <span className="ml-auto">{open ? "▲" : "▼"}</span>}
          </button>

          {open && (
            <div className="ml-6 mt-1 space-y-1">
              {item.children.map((child) => {
                const ChildIcon = Icons[child.icon || "arrowRight"];
                return (
                  child.href && (
                    <Link
                      key={child.title}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                        path === child.href ? "bg-muted" : "",
                      )}
                    >
                      <ChildIcon className="size-4" />
                      {child.title}
                    </Link>
                  )
                );
              })}
            </div>
          )}
        </>
      ) : (
        // Default (no children) links
        item.href ? (
          <Link
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
              path === item.href
                ? "bg-muted"
                : "text-muted-foreground hover:text-accent-foreground",
              item.disabled &&
                "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
            )}
          >
            <Icon className="size-5" />
            {isSidebarExpanded && item.title}
            {isSidebarExpanded && item.badge && (
              <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                {item.badge}
              </Badge>
            )}
          </Link>
        ) : null
      )}
    </div>
  );
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();

  // NOTE: Use this if you want save in local storage -- Credits: Hosna Qasmei
  //
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const saved = window.localStorage.getItem("sidebarExpanded");
  //     return saved !== null ? JSON.parse(saved) : true;
  //   }
  //   return true;
  // });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.localStorage.setItem(
  //       "sidebarExpanded",
  //       JSON.stringify(isSidebarExpanded),
  //     );
  //   }
  // }, [isSidebarExpanded]);

  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <aside
            className={cn(
              isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]",
              "hidden h-screen md:block",
            )}
          >
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded ? (
                  <Link href="/" className="flex items-center space-x-1.5">
                    <Icons.logo />
                    <span className="font-satoshi text-xl font-bold">
                      {siteConfig.name}
                    </span>
                  </Link>
                ) : (
                  <Link href="/" className="flex items-center justify-center">
                    <Icons.logo />
                  </Link>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-4 pt-4">
              {links.map((section) => (
             <section key={section.title ?? section.items[0].title} className="flex flex-col gap-0.5">
              {/* Only render the title if it exists */}
              {isSidebarExpanded && section.title && (
              <p className="text-xs text-muted-foreground">{section.title}</p>
               )}
    
               {section.items.map((item) => (
               <SidebarItem
                key={item.title}
               item={item}
               path={path}
                 isSidebarExpanded={isSidebarExpanded}
           />
           ))}
           </section>
))}

              </nav>

              <div className="mt-auto p-4">
                {isSidebarExpanded ? <ProjectSwitcher /> : null}
              </div>
            </div>
          </aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();

  if (isSm || isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-screen flex-col">
              <nav className="flex flex-1 flex-col gap-y-8 p-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Icons.logo className="size-6" />
                  <span className="font-satoshi text-lg font-bold">
                    {siteConfig.name}
                  </span>
                </Link>

                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    {section.title && (
                      <p className="text-xs text-muted-foreground">
                        {section.title}
                      </p>
                    )}

                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return item.children ? (
                        <Accordion
                          key={`accordion-${item.title}`}
                          type="single"
                          collapsible
                          className="w-full"
                        >
                          <AccordionItem value={item.title} className="border-b-0">
                            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                              <div
                                className={cn(
                                  "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                  "text-muted-foreground hover:text-accent-foreground",
                                )}
                              >
                                <Icon className="size-5" />
                                {item.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-1 pt-0">
                              <div className="ml-6 mt-1 space-y-1">
                                {item.children.map((child) => {
                                  const ChildIcon =
                                    Icons[child.icon || "arrowRight"];
                                  return (
                                    child.href && (
                                      <Link
                                        key={child.title}
                                        onClick={() => {
                                          if (!child.disabled) setOpen(false);
                                        }}
                                        href={child.href}
                                        className={cn(
                                          "flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
                                          path === child.href ? "bg-muted" : "",
                                        )}
                                      >
                                        <ChildIcon className="size-4" />
                                        {child.title}
                                      </Link>
                                    )
                                  );
                                })}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Fragment key={`link-fragment-${item.title}`}>
                          {item.href ? (
                            <Link
                              key={`link-${item.title}`}
                              onClick={() => {
                                if (!item.disabled) setOpen(false);
                              }}
                              href={item.disabled ? "#" : item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                path === item.href
                                  ? "bg-muted"
                                  : "text-muted-foreground hover:text-accent-foreground",
                                item.disabled &&
                                  "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
                              )}
                            >
                              <Icon className="size-5" />
                              {item.title}
                              {item.badge && (
                                <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </section>
                ))}
              </nav>

              <div className="mt-auto p-6">
                <ProjectSwitcher large />
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />
  );
}
