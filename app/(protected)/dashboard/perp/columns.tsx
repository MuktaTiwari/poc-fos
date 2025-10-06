'use client';

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Business } from "./api";

export const getColumns = (
  deletePerp: (id: string) => void,
  toggleActive: (id: string, isActive: boolean) => void,
): ColumnDef<Business>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row ${row.index + 1}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    minSize: 50,
    maxSize: 50,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 justify-start px-0 font-medium"
          aria-label={`Sort by name ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="font-medium text-foreground" title={name}>
          {name}
        </div>
      );
    },
    minSize: 200,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 justify-start px-0 font-medium"
          aria-label={`Sort by type ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="font-medium text-foreground" title={type}>
          {type}
        </div>
      );
    },
    minSize: 100,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 justify-start px-0 font-medium"
          aria-label={`Sort by status ${column.getIsSorted() === "asc" ? "descending" : "ascending"}`}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      const perp = row.original;
      return (
        <Button
          variant={isActive ? "default" : "secondary"}
          size="sm"
          onClick={() => toggleActive(perp.id, !isActive)}
          className={`h-6 px-2 text-xs ${
            isActive 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-gray-300 hover:bg-gray-400 text-gray-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </Button>
      );
    },
    minSize: 100,
  },
  {
    id: "actions",
    header: () => (
      <div className="text-right">
        <span className="sr-only">Actions</span>
      </div>
    ),
    cell: ({ row }) => {
      const perp = row.original;

      return (
        <div className="flex justify-end">
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  aria-label={`Actions for ${perp.name}`}
                >
                  <span className="sr-only">Open menu for {perp.name}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link 
                    href={`/dashboard/perp/${perp.id}`}
                    className="flex w-full cursor-pointer items-center"
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => toggleActive(perp.id, !perp.isActive)}
                  className="flex w-full cursor-pointer items-center"
                >
                  {perp.isActive ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete PERP</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{perp.name}&quot;? This action cannot be undone and will permanently remove this PERP from your system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deletePerp(perp.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
    minSize: 80,
    maxSize: 80,
  },
];