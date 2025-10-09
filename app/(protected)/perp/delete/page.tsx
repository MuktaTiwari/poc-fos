"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export interface PerpData {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
}

function PerpDeleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState<PerpData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/business/${id}`);
      // Based on your PerpList component, the data might be nested in a data property
      setItem(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItemDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3000/business/${id}`);
      router.push("/perp");
    } catch (error) {
      console.error("Error deleting PERP item:", error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/perp");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &ldquo;{item?.name || `Item ${id}`}&rdquo;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. If you delete this PERP, all its child
            records will also be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function PerpDeletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PerpDeleteContent />
    </Suspense>
  );
}