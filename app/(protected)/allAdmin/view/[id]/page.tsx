"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AllAdminData } from "../../columns";

export default function ViewAdminPopup() {
  const [admin, setAdmin] = useState<AllAdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {id} = useParams();

  const fetchAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/business/${id}`);
      setAdmin(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching admin:", error);
      setError("Failed to load admin details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAdmin();
    } else {
      setError("No admin ID provided");
      setIsLoading(false);
    }
  }, [id, fetchAdmin]);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className="size-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <p className="text-sm text-gray-600">Loading admin details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Error</DialogTitle>
            <DialogDescription>
              {error}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
          <DialogDescription>
            View detailed information about this admin user.
          </DialogDescription>
        </DialogHeader>
        
        {admin ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left text-sm font-medium">Name</span>
              <span className="col-span-3 font-semibold">{admin.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left text-sm font-medium">Email</span>
              <span className="col-span-3">{admin.emailId}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left text-sm font-medium">AssignRole</span>
              <span className="col-span-3">{admin.assignRole}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left text-sm font-medium">Phone</span>
              <span className="col-span-3">{admin.phoneNo}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-left text-sm font-medium">Status</span>
              <span className="col-span-3">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    admin.status 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {admin.status ? "Active" : "Inactive"}
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No admin data found</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}