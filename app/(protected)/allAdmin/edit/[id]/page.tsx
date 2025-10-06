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

  
  return (
     <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <DashboardHeader
              heading="Edit New Serp"
              text="Access only for users with ADMIN role."
            />
          </div>
      </div>

  )
}
