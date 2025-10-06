"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { DashboardHeader } from "@/components/dashboard/header";
import PerpForm from "@/components/forms/perp-create-form";

export default function PerpAddPage() {
  const router = useRouter();

  const handleAdd = async (data: any) => {
    await axios.post("http://localhost:3000/business", data);
    router.push("/perp");
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <DashboardHeader
          heading="Add New Perp"
          text="Access only for users with ADMIN role."
        />
      </div>
      <PerpForm onSubmit={handleAdd} />
    </div>
  );
}