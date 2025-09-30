"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ correct import
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, SerpData } from "../columns";
import SerpAddPage, { SERPFormData } from "../serpAdd/page";

export default function SerpList() {
  const [data, setData] = useState<SerpData[]>([]);
  const router = useRouter(); // ✅ works in client component
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchSerp = async () => {
      try {
        const serpData = await axios.get<SerpData[]>(
          "http://localhost:3001/serp",
        );
        setData(serpData.data);
      } catch (error) {
        console.log("error fetching the serp from the db.json");
      }
    };

    fetchSerp();
  }, []);

  const handleEdit = (row: SerpData) => {
    // assuming your edit page is /dashboard/serpEdit/[name] or [id]
    router.push(`/dashboard/serpEdit/${encodeURIComponent(row.name)}`);
  };
  const handleDelete = (row: SerpData) => console.log("Delete:", row);
  const handleView = (row: SerpData) => console.log("View:", row);


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
