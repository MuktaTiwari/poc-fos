"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, AllAdminData } from "./columns";
import { DataTable } from "./data-table";

export default function AllAdminList() {
  const [data, setData] = useState<AllAdminData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const fetchAllAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3002/business");
      // Ensure each item has an id
      const dataWithIds = response.data.map((item: any, index: number) => ({
        ...item,
        id: item.id || `admin-${index}`, // Add id if missing
      }));
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleEdit = (row: AllAdminData) => {
    router.push(`/allAdmin/edit/${row.id}`);
  };

  const handleDelete = (row: AllAdminData) => {
    router.push(`/allAdmin/delete/${row.id}`);
  };

  const handleView = (row: AllAdminData) => {
    router.push(`/allAdmin/view?id=${row.id}`);
  };

  const columns = getColumns(handleView, handleEdit, handleDelete);

  return (
    <div className="p-4">
      <DashboardHeader
        heading="Admin Management"
        text="Manage all admin users and their permissions"
      >
        <Button>Add New Admin</Button>
      </DashboardHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
}