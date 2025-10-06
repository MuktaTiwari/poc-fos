"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import SerpForm from "@/components/forms/serp-create-form";
import { SERPFormData } from "@/lib/type";
import { DashboardHeader } from "@/components/dashboard/header";

export default function SerpEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<SERPFormData | undefined>();
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]);

  useEffect(() => {
  const fetchParent = async () => {
    try {
      // Fetch parent options
      const getAllParent = await axios.get("http://localhost:3000/business?type=PERP");
      setParentOptions(getAllParent.data.data);

      // If editing, fetch the existing data
      if (id) {
        const fetchAllData = await axios.get(`http://localhost:3000/business/${id}`);
        console.log("fethc the data for edit to set in initial data",fetchAllData )
        setInitialData(fetchAllData.data.data);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchParent(); 
}, [id]);

  const handleEdit = async (data: any) => {
    await axios.patch(`http://localhost:3000/business/${id}`, data);
    router.push("/serp/list");
  };

  if (!initialData) return <p>Loading...</p>;

  return (
     <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <DashboardHeader
              heading="Edit New Serp"
              text="Access only for users with ADMIN role."
            />
          </div>
    <SerpForm initialData={initialData} parentOptions={parentOptions} onSubmit={handleEdit} onCancel={() => router.push("/serp")} />
      </div>

  )
}
