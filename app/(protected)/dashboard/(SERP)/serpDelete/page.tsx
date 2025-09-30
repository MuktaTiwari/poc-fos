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
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      const response = await axios.get<SerpData>(
        `http://localhost:3001/serp/${id}`
      );
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3001/serp/${id}`);
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
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        <DashboardHeader
          heading="Delete SERP Item"
          text="Confirm deletion of SERP item"
        />

        {/* Item Details Card */}
        {item && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">ID:</span>
                  <p className="mt-1 font-medium">{item.id}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Name:</span>
                  <p className="mt-1 font-medium">{item.name}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Type:</span>
                  <p className="mt-1 font-medium">{item.type}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Status:</span>
                  <p className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Dialog */}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <AlertDialogTitle className="text-center text-xl">
                Delete SERP Item?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-base">
                Are you sure you want to delete{" "}
                <strong className="font-semibold text-foreground">
                  {item?.name || "this item"}
                </strong>
                ? This action cannot be undone and will permanently remove the item from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <AlertDialogCancel 
                onClick={handleCancel}
                disabled={isLoading}
                className="mt-0 sm:flex-1"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 sm:flex-1"
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
      </div>
    </main>
  );
} 