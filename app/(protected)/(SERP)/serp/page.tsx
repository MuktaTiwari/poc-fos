"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, SerpData } from "./columns";

export default function SerpList() {
  const [data, setData] = useState<SerpData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSerp();
  }, []);

  const fetchSerp = async () => {
    try {
      const serpData = await axios.get("http://localhost:3000/business?type=SERP");
      setData(serpData.data.data);
    } catch (error) {
      console.log("error fetching the serp from the db.json");
    }
  };

  const handleEdit = (row: SerpData) => {
    router.push(`/edit/${encodeURIComponent(row.id)}`);
  };

  const handleDelete = (row: SerpData) => {
    // Navigate to delete page with item details
    router.push(`/delete?id=${row.id}`);
  };

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="SERP Panel"
          text="Access only for users with ADMIN role."
        />

        <Button
          onClick={() => router.push("/create")}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
        >
          Add SERP
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
