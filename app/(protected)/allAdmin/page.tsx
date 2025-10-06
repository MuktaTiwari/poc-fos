"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, AllAdminData } from "./columns";
import { DataTable } from "./data-table";

export default function SerpList() {
  const [data, setData] = useState<AllAdminData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const fetchAllAdmins = async () => {
    try {
      const serpData = await axios.get("http://localhost:3002/business");
      setData(serpData.data);
    } catch (error) {
      console.log("error fetching the serp from the db.json");
    }
  };

  const handleEdit = (row: AllAdminData) => {
    router.push(`/allAdmin/edit/${encodeURIComponent(row.id)}`);
  };

  const handleDelete = (row: AllAdminData) => {
    router.push(`/allAdmin/delete/${row.id}`);
  };
    const handleView = (row: AllAdminData) => {
    router.push(`/allAdmin/view`);
  };


  const columns = getColumns(handleView,handleEdit, handleDelete);

  return (
    <div className="p-4">
     

      <DataTable columns={columns} data={data} />
    </div>
  );
}
