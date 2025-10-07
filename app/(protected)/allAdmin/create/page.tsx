"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import AdminCreateForm from "@/components/forms/admin-create-form"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    return (
        <div>
            <DashboardHeader
                heading="Add Admin form"
                text="Access only for users with ADMIN role."
            />
            <AdminCreateForm router={router} />
        </div>
    )
}