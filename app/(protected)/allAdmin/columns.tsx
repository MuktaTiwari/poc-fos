"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface AllAdminData {
  id: string;
  name: string;
  roles: string;
  status: string;
  email: string;
  phone: string;
  createdBy: string;
  createdOn: string;
  lastActivity: string;
}

export const getColumns = (
  handleView: (row: AllAdminData) => void,
  handleEdit: (row: AllAdminData) => void,
  handleDelete: (row: AllAdminData) => void
): ColumnDef<AllAdminData>[] => [
  {
    accessorKey: "name",
    header: "Admin Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const initials = name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-500 font-mono">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-600">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.getValue("roles") as string}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();
      const color =
        status === "active"
          ? "bg-green-100 text-green-800"
          : status === "inactive"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800";

      return (
        <span
          className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${color}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
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
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-gray-300 hover:bg-gray-100"
            onClick={() => handleView(item)}
          >
            <Eye className="h-4 w-4 text-gray-700" /> View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-gray-300 hover:bg-gray-100"
            onClick={() => handleEdit(item)}
          >
            <Pencil className="h-4 w-4 text-gray-700" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-gray-300 hover:bg-gray-100"
            onClick={() => handleDelete(item)}
          >
            <Trash2 className="h-4 w-4 text-gray-700" /> Delete
          </Button>
        </div>
      );
    },
  },
];
