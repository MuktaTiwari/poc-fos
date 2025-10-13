"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import SerpForm from "@/components/forms/serp-create-form";
import { SERPFormData } from "@/lib/type";
import { DashboardHeader } from "@/components/dashboard/header";
import { env } from "@/env.mjs";
import { toast } from "sonner";
import { cleanPayload } from "@/lib/utils";

export default function SerpEditPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<SERPFormData | undefined>();
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchParent = async () => {
      try {
        // Fetch parent options
        const getAllParent = await axios.get(`${env.NEXT_PUBLIC_APP_URL}/business?type=PERP`);
        setParentOptions(getAllParent.data.data);

        // If editing, fetch the existing data
        if (id) {
          const fetchAllData = await axios.get(`${env.NEXT_PUBLIC_APP_URL}/business/${id}`);
          console.log("fethc the data for edit to set in initial data", fetchAllData)
          setInitialData(fetchAllData.data.data);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParent();
  }, [id]);

  const handleEdit = async (data: any) => {
    const payload = cleanPayload(data);
    try {
      await axios.patch(`${env.NEXT_PUBLIC_APP_URL}/business/${id}`, payload);
      toast.success("SERP updated successfully!");
      router.push("/serp/list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update SERP.");
    }
  };
  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Edit Existing SERP"
          text="Access only for users with ADMIN role."
        />
      </div>
      <SerpForm initialData={initialData} parentOptions={parentOptions} onSubmit={handleEdit} onCancel={() => router.push("/serp")} />
    </div>

  )
}
