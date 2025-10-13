"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { SERPFormData } from "@/lib/type";
import { DashboardHeader } from "@/components/dashboard/header";
import SerpForm from "@/components/forms/serp-create-form";
import { env } from "@/env.mjs";
import { toast } from "sonner";
import { cleanPayload } from "@/lib/utils";

export default function SerpAddPage() {
  const router = useRouter();
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]);

  useEffect(() => {
    const fetchParent = async () => {

      try {
        const response = await axios.get(`${env.NEXT_PUBLIC_APP_URL}/business?type=PERP`);
        setParentOptions(response.data.data);

      }
      catch (error) {
        toast.error("Failed to Fetch The SERP.");

      }

    }
    fetchParent();
  }, [])

  const handleAdd = async (data: any) => {
    const playload = cleanPayload(data);
    try {
      await axios.post(`${env.NEXT_PUBLIC_APP_URL}/business`, playload);
      toast.success("SERP created successfully!");
      router.push("/serp/list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create SERP.");
    }
  };
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Create New SERP"
          text="Access only for users with ADMIN role."
        />
      </div>
      <SerpForm onSubmit={handleAdd} parentOptions={parentOptions} onCancel={() => router.push("/serp")} />
    </div>
  );
}
