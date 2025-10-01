"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios
import { MoreHorizontal } from "lucide-react"; // Import MoreHorizontal

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components

import { columns, data } from './column';

import { DeleteOrganizationDialog } from "./deleteOrganizationDialog"; // Import DeleteOrganizationDialog
import { DataTable } from "@/components/ui/data-table";

// import { DataTable } from '../../ui/data-table'; // Adjust the import path as necessary


export default function OrganizationPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business?type=ORGANIZATION`);
      const result = response.data;
      const fetchedOrganizations: data[] = result.data.map(
        (org: any) => ({
          ...org,
          isActive: org.isActive ? "active" : "inactive",
          createdAt: new Date(org.createdAt),
          updatedAt: new Date(org.updatedAt),
          code: org.code || "N/A",
          level: org.level || 0,
        }),
      );
      setOrganizations(fetchedOrganizations);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Modify columns to include the onSuccess callback
  const columnsWithDelete = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 dark:border-gray-700 dark:bg-gray-800">
              <DropdownMenuItem className="dark:hover:bg-gray-700 dark:hover:text-white">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteOrganizationDialog
                  organizationId={row.original.id}
                  onSuccess={fetchOrganizations}
                >
                  <button className="w-full text-left">Delete</button>
                </DeleteOrganizationDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      };
    }
    return col;
  });

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Organization List
          </span>
        </div>
        <div className="flex items-center space-x-2">
          
          <Link
            href="/dashboard/org/new"
            className="rounded bg-gray-800 px-6 py-2 text-sm text-white hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Add
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="text-center dark:text-white">
          Loading organizations...
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 text-center text-red-500">Error: {error}</div>
          )}
          <DataTable columns={columnsWithDelete} data={organizations} />
        </>
      )}
    </div>
  );
}
