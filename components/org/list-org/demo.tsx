"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios

import { columns, Organization } from "./column";
import { DataTable } from "./data-table";
import Link from "next/link";
// import { Link } from "lucide-react";

export default function OrganizationPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get("http://172.1.0.9:3000/business"); // Use axios.get
        const result = response.data; // Axios automatically parses JSON
        // The API returns an object with a 'data' key containing the array of organizations
        const fetchedOrganizations: Organization[] = result.data.map(
          (org: any) => ({
            ...org,
            isActive: org.isActive ? "active" : "inactive", // Convert boolean to string for display
            createdAt: new Date(org.createdAt),
            updatedAt: new Date(org.updatedAt),
            code: org.code || "N/A", // Provide a default if code is missing
            level: org.level || 0, // Provide a default if level is missing
          }),
        );
        setOrganizations(fetchedOrganizations);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">
            Organization List
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search SERP..."
            className="w-64 rounded border p-2 text-sm"
          />
          <Link
            href="/dashboard/org/new"
            className="rounded bg-gray-500 px-6 py-2 text-sm text-white hover:bg-gray-900"
          >
            Add
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Loading organizations...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <DataTable columns={columns} data={organizations} />
      )}
    </div>
  );
}