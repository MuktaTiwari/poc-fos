"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
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

export interface SerpData {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
}

export default function SerpDeletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState<SerpData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`http://172.1.0.9:3000/business/${id}`);
      // Based on your SerpList component, the data might be nested in a data property
      setItem(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://172.1.0.9:3000/business/${id}`);
      console.log("SERP item deleted successfully");
      router.push("/dashboard/serpList");
    } catch (error) {
      console.error("Error deleting SERP item:", error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/serpList");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete "{item?.name || `Item ${id}`}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
          >
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