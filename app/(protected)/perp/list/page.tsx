"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, PerpData } from "./columns";

export default function PerpList() {
  const [data, setData] = useState<PerpData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPerp();
  }, []);

  const fetchPerp = async () => {
    try {
      const perpData = await axios.get("http://localhost:3000/business?type=PERP");
      setData(perpData.data.data);
    } catch (error) {
      console.log("error fetching the perp from the db.json");
    }
  };

  const handleEdit = (row: PerpData) => {
    router.push(`/edit-page/${encodeURIComponent(row.id)}`);
  };

  const handleDelete = (row: PerpData) => {
    // Navigate to delete page with item details
    router.push(`/delete-page?id=${row.id}`);
  };

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="PERP Panel"
          text="Access only for users with ADMIN role."
        />

        <Button
          onClick={() => router.push("/create-page")}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
        >
          Add PERP
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}