"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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

export interface SerpData {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
}

export default function SerpDeletePage() {
  const router = useRouter();
  const { id } = useParams();
  const [item, setItem] = useState<SerpData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/business/${id}`,
        );
        // Based on your SerpList component, the data might be nested in a data property
        setItem(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3000/business/${id}`);
      router.push("/serp/list");
    } catch (error) {
      console.error("Error deleting SERP item:", error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/serp/list");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{item?.name || `SERP ${id}`}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. If you delete this SERP, all its child
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
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
