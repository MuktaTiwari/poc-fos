"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import AdminCreateForm from "@/components/forms/admin-create-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="max-w-2xl">
                <div>
                    <DashboardHeader
                        heading="Add Admin Form"
                        text="Access only for users with ADMIN role."
                    />
                    <AdminCreateForm router={router} />
                </div>
            </DialogContent>

        </Dialog>
    );
}
