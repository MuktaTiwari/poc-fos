"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ correct import

import { DataTable } from "@/components/ui/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, SerpData } from "../columns";
import SerpAddPage, { SERPFormData } from "../serpAdd/page";
import { Button } from "@/components/ui/button";

export default function SerpList() {
  const [data, setData] = useState<SerpData[]>([
    { name: "ReactJS", type: 1, isActive: true },
    { name: "Next.js", type: 2, isActive: true },
    { name: "ShadCN UI", type: 3, isActive: true },
  ]);

  const router = useRouter(); // ✅ works in client component

  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (row: SerpData) => console.log("Edit:", row);
  const handleDelete = (row: SerpData) => console.log("Delete:", row);
  const handleView = (row: SerpData) => console.log("View:", row);

  const handleSubmit = (formData: SERPFormData) => {
    const newRow: SerpData = {
      name: formData.name,
      type: formData.type,
      isActive: true,
    };
    setData((prev) => [...prev, newRow]);
    setShowAddForm(false);
  };

  const columns = getColumns(handleEdit, handleDelete, handleView);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="SERP Panel"
          text="Access only for users with ADMIN role."
        />

        <Button
          onClick={() => router.push("/dashboard/serpAdd")}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
        >
          Add SERP
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
