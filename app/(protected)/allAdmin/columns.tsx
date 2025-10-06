"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AllAdminData {
  adminName: string;
  adminType: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
  create_by: string;
  created_on: Date;
  lastActivity: Date;
}

export const getColumns = (
  handleView: (row: AllAdminData) => void,
  handleEdit: (row: AllAdminData) => void,
  handleDelete: (row: AllAdminData) => void,
): ColumnDef<AllAdminData>[] => [
  {
    accessorKey: "adminName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-5 w-5" />
      </Button>
    ),
  },
  {
    accessorKey: "adminType",
    header: "Type",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("status") as boolean;
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "create_by",
    header: "Created By",
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    cell: ({ row }) =>
      new Date(row.getValue("created_on")).toLocaleDateString(),
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) =>
      new Date(row.getValue("lastActivity")).toLocaleString(),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleView(item)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(item)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(item)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
