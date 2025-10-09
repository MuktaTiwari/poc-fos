"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import { getColumns, AllAdminData } from "./columns";
import { DataTable } from "./data-table";
import FilterBar from "./filters/filter";
import { FilterState } from "./filters/types";

export default function AllAdminList() {
  const [data, setData] = useState<AllAdminData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "",
    status: "",
    createdBy: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const fetchAllAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3002/users");
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
    router.push(`/allAdmin/view/${row.id}`);
  };

    const filteredData = data.filter((admin) => {
    const matchesSearch =
      admin.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      admin.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      admin.phone.toLowerCase().includes(filters.search.toLowerCase());

    const matchesRole = filters.role ? admin.roles === filters.role : true;
    const matchesStatus = filters.status ? admin.status === filters.status : true;
    const matchesCreator = filters.createdBy ? admin.createdBy === filters.createdBy : true;

    return matchesSearch && matchesRole && matchesStatus && matchesCreator;
  });
  const columns = getColumns(handleView, handleEdit, handleDelete);

  return (
    <div className="p-4">
      {/* Pass filters and setter to FilterBar */}
      <FilterBar filters={filters} setFilters={setFilters} data={data} />
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}