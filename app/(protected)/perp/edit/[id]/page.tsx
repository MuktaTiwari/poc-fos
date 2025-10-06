"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import PerpForm from "@/components/forms/perp-create-form";
import { PERPFormData } from "@/lib/type";
import { DashboardHeader } from "@/components/dashboard/header";

export default function PerpEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<PERPFormData | undefined>();
  const [parentOptions, setParentOptions] = useState<PERPFormData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parent options (if needed for other types)
        const getAllParent = await axios.get("http://localhost:3000/business?type=PERP");
        setParentOptions(getAllParent.data.data);

        // If editing, fetch the existing data
        if (id) {
          const fetchAllData = await axios.get(`http://localhost:3000/business/${id}`);
          console.log("fetch the data for edit to set in initial data", fetchAllData);
          setInitialData(fetchAllData.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = async (data: any) => {
    await axios.patch(`http://localhost:3000/business/${id}`, data);
    router.push("/perp");
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Edit Perp"
          text="Access only for users with ADMIN role."
        />
      </div>
      <PerpForm 
        initialData={initialData} 
        onSubmit={handleEdit} 
        onCancel={() => router.push("/perp")} 
      />
    </div>
  );
}