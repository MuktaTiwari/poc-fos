"use client";

import { DashboardHeader } from "@/components/dashboard/header";

export default function SerpEditPage() {

  
  return (
     <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <DashboardHeader
              heading="View New Serp"
              text="Access only for users with ADMIN role."
            />
          </div>
      </div>

  )
}
