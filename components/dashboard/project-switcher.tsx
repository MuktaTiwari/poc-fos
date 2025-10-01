"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ProjectType = {
  title: string;
  slug: string;
  color: string;
  type: string;
};

const projects: ProjectType[] = [
  {
    title: "HDFC Bank Ltd",
    slug: "hdfc-bank-ltd",
    color: "bg-blue-600",
    type: "SERP",
  },
  {
    title: "Patanjali Ayurveda Pvt Ltd",
    slug: "patanjali-ayurveda",
    color: "bg-green-600",
    type: "ORG",
  },
  {
    title: "Reliance Retail Ltd",
    slug: "reliance-retail",
    color: "bg-purple-600",
    type: "ORG",
  },
];
const selected: ProjectType = projects[0];

export default function ProjectSwitcher({
  large = false,
}: {
  large?: boolean;
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);

  if (!projects || status === "loading") {
    return <ProjectSwitcherPlaceholder />;
  }

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <Button
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  selected.color,
                )}
              />
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">
                  ({selected.type})
                </span>
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium",
                    large ? "max-w-full" : "max-w-[140px] xl:max-w-[160px]",
                  )}
                >
                  {selected.title}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selected}
            projects={projects}
            setOpenPopover={setOpenPopover}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProjectList({
  selected,
  projects,
  setOpenPopover,
}: {
  selected: ProjectType;
  projects: ProjectType[];
  setOpenPopover: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {projects.map(({ slug, color, title, type }) => (
        <Link
          key={slug}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex min-h-[44px] items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
          )}
          href="#"
          onClick={() => setOpenPopover(false)}
        >
          <div className={cn("size-3 shrink-0 rounded-full", color)} />
          <div className="flex flex-1 flex-col items-start">
            <span className="text-xs text-muted-foreground">({type})</span>
            <span
              className={`truncate text-sm ${
                selected.slug === slug
                  ? "font-medium text-foreground"
                  : "font-normal"
              }`}
            >
              {title}
            </span>
          </div>
          {selected.slug === slug && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
              <Check size={18} aria-hidden="true" />
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
