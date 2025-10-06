"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { SERPFormData } from "@/lib/type";
import { DashboardHeader } from "@/components/dashboard/header";
import SerpForm from "@/components/forms/serp-create-form";

export default function SerpAddPage() {
  const router = useRouter();
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/business?type=PERP")
      .then((res) => setParentOptions(res.data.data));
  }, []);

  const handleAdd = async (data: any) => {
    await axios.post("http://localhost:3000/business", data);
    router.push("/serp/list");
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Add New Serp"
          text="Access only for users with ADMIN role."
        />
      </div>
      <SerpForm onSubmit={handleAdd} parentOptions={parentOptions} />
    </div>
  );
}
