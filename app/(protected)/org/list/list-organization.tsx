"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardHeader } from "@/components/dashboard/header";

import { DeleteOrganizationDialog } from "../delete/deleteOrganizationDialog";
// import Demo from "./demo";
import { columns, data } from "./column";

// import { DeleteOrganizationDialog } from "./deleteOrganizationDialog";

export default function ListOrganization() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business?type=ORGANIZATION`,
      );
      const result = response.data;
      const fetchedOrganizations: data[] = result.data.map((org: any) => ({
        ...org,
        isActive: org.isActive ? "active" : "inactive",
        createdAt: new Date(org.createdAt),
        updatedAt: new Date(org.updatedAt),
        code: org.code || "N/A",
        level: org.level || 0,
      }));
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

  const columnsWithActions = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 dark:border-gray-700 dark:bg-gray-800">
              <DropdownMenuItem
                className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => router.push(`/org/edit/${row.original.id}`)}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DeleteOrganizationDialog
                  organizationId={row.original.id}
                  organizationName={row.original.name}
                  onSuccess={fetchOrganizations}
                >
                  <button className="w-full px-4 py-2 text-left text-sm font-medium text-black-700 hover:bg-red-100 dark:text-blue-400 dark:hover:bg-blue-700">
                    Delete
                  </button>
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
      {/* Optional Demo Section */}
      <div className="mb-8">{/* <Demo /> */}</div>

      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Organization List"
          text="Access only for users with ADMIN role."
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/org/create"
            className="rounded bg-primary px-6 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-700"
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
          <DataTable
            columns={columnsWithActions}
            data={
              organizations
                .map((org) => ({ ...org, email: org.name })) // for search
               
            }
          />
        </>
      )}
    </div>
  );
}
