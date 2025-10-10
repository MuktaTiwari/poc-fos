"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrgForm from "@/components/forms/org-form";

interface EditOrgClientProps {
  id: string;
}

export default function EditOrgClient({ id }: EditOrgClientProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Handle placeholder - redirect to list if someone directly accesses it
    if (id === "placeholder") {
      router.replace("/org");
      return;
    }

    // Validate that ID is present and valid
    if (!id || id.trim() === "") {
      router.replace("/org");
      return;
    }

    // ID is valid, proceed to render
    setIsReady(true);
  }, [id, router]);

  // Show loading state while validating/redirecting
  if (!isReady) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <OrgForm isEdit={true} id={id} />;
}
