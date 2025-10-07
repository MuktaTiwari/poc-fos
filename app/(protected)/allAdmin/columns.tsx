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
  id:string;
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
    cell: ({ row }) => {
      const name = row.getValue("adminName") as string;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            {/* You can replace AvatarImage src with admin profile URL if available */}
            <AvatarFallback className="text-blue-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const role = (row.getValue("role") as string).toLowerCase();

      // Define role colors
      const roleColors: Record<string, string> = {
        admin: "bg-blue-100 text-blue-800",
        "super admin": "bg-purple-100 text-purple-800",
        manager: "bg-orange-100 text-orange-800",
        developer: "bg-teal-100 text-teal-800",
        "system admin": "bg-pink-100 text-pink-800",
        organization: "bg-yellow-100 text-yellow-800",
      };

      // Default color if no match
      const colorClass = roleColors[role] || "bg-gray-100 text-gray-800";

      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colorClass}`}
        >
          {row.getValue("role")}
        </span>
      );
    },
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
    cell: ({ row }) => new Date(row.getValue("lastActivity")).toLocaleString(),
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