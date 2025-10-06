"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type data = {
  id: string;
  name: string;
  code?: string; // Made optional
  type: string;
  level?: number; // Made optional
  parentId?: string | null; // Made optional
  perpId?: string | null;
  serpId?: string | null;
  registryId?: string | null;
  orgId?: string | null;
  cuId?: string | null;
  isActive: boolean; // Changed to boolean
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<data>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="size-4 rounded border-gray-300 dark:border-gray-700"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="size-4 rounded border-gray-300 dark:border-gray-700"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Name <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-left lowercase">{row.getValue("name")}</div>
    ),
    meta: { align: "left" },
  },

  {
    accessorKey: "type",
    header: "Type",
  },

  {
    accessorKey: "email",
    header: "Organization Name",
    filterFn: (row, id, value) => {
      const cellValue = row.getValue(id) as string;
      return cellValue?.toLowerCase().startsWith(value.toLowerCase());
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
          row.getValue("isActive") === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-white"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-white"
        }`}
      >
        {row.getValue("isActive")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded p-2 text-gray-600 hover:bg-gray-100">
            ...
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
