"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AdminCreateForm from "@/components/forms/admin-create-form";

export default function EditAdmin() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [adminData, setAdminData] = useState<any>(null);

  const fetchAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/business/${id}`);
      setAdminData(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAdmin();
    }
  }, [id, fetchAdmin]);

  if (!adminData) {
    return <div className="p-4 text-gray-500">Loading admin details...</div>;
  }

  return (
    <div className="p-4">
      <AdminCreateForm admin={adminData} router={router} />
    </div>
  );
}