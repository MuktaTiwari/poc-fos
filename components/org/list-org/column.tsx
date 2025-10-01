"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteOrganizationDialog } from "./deleteOrganizationDialog";

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
    header: "Name",
  },

  {
    accessorKey: "type",
    header: "Type",
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
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 dark:border-gray-700 dark:bg-gray-800">
          <DropdownMenuItem className="flex items-center gap-2 dark:hover:bg-gray-700 dark:hover:text-white">
            <EditIcon className="h-4 w-4 text-blue-500" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="flex items-center gap-2 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <DeleteOrganizationDialog
              organizationId={row.original.id}
              onSuccess={() => {
                /* This will be replaced by a function from demo.tsx */
              }}
            >
              <button className="flex w-full items-center gap-2 text-left">
                <Trash2Icon className="h-4 w-4 text-red-500" />
                Delete
              </button>
            </DeleteOrganizationDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }
];
