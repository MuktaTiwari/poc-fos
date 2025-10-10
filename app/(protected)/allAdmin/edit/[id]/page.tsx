"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AdminCreateForm from "@/components/forms/admin-create-form";
import { env } from "@/env.mjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/dashboard/header";

export default function EditAdminPopup() {
  const router = useRouter();
  const { id } = useParams();

  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch the admin data by ID
  const fetchAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/users/${id}`);
      setAdminData(response.data);
    } catch (err: any) {
      console.error("Error fetching admin data:", err);
      const message = err?.response?.data?.message || "Failed to fetch admin details";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchAdmin();
  }, [id, fetchAdmin]);

  // ✅ Loading or error states inside popup
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-2xl">
        {loading ? (
          <div className="p-4 text-gray-500">Loading admin details...</div>
        ) : error ? (
          <div className="p-4 flex flex-col items-center gap-3 text-red-500">
            <p>{error}</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        ) : (
          <div>
            <DashboardHeader
              heading="Edit Admin Details"
              text="Modify admin information below."
            />
            <AdminCreateForm admin={adminData} router={router} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
