"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import RegistryCreateForm from "@/components/forms/registry-create-form"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return (
    <div>
      <DashboardHeader
        heading="Add Org form"
        text="Access only for users with ADMIN role."
      />
      <RegistryCreateForm router={router} />
    </div>
  )
}

