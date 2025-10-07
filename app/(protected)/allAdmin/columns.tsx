"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AllAdminData {
  id: string;
  name: string;
  emailId: string;
  phoneNo?: string;
  status: string;
  adminType: string;
  assignRole: string;
  create_by?: string;
  created_on?: Date;
  lastActivity?: Date;
}

export const getColumns = (
  handleView: (row: AllAdminData) => void,
  handleEdit: (row: AllAdminData) => void,
  handleDelete: (row: AllAdminData) => void,
): ColumnDef<AllAdminData>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-5" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = (row.getValue("name") as string) || "";
      const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="text-blue-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span>{name || "No Name"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "emailId",
    header: "Email",
  },
  {
    accessorKey: "phoneNo",
    header: "Phone",
  },
  {
    accessorKey: "adminType",
    header: "Admin Type",
    cell: ({ row }) => {
      const type = (row.getValue("adminType") as string) || "N/A";
      return (
        <span className="inline-flex rounded-full bg-blue-50 px-2 text-xs font-semibold text-blue-800">
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "assignRole",
    header: "Assign Role",
    cell: ({ row }) => {
      const role = (row.getValue("assignRole") as string) || "N/A";
      const color =
        role.toLowerCase() === "maker"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800";

      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${color}`}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();
      const isActive = status === "active" || status === "true";
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
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
