"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Search, Filter, Edit, Trash2 } from "lucide-react";

export default function ViewAdminPopup() {
  const [admin, setAdmin] = useState<AllAdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const fetchAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/users/${id}`);
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
        <DialogContent className="max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-5 p-8">
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-destructive">Error</DialogTitle>
            <DialogDescription>{error}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">All Users</DialogTitle>
          <DialogDescription className="text-sm">
            Manage admin accounts, roles, and peers
          </DialogDescription>
        </DialogHeader>

        {admin ? (
          <div className="space-y-8 py-2">
            {/* Admin Information - Two Column Layout */}
            <div className="space-y-3">
              <h3 className="text-md font-semibold">Admin Information</h3>
              <div className="rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Full Name</span>
                      <span className="text-sm text-gray-900">{admin.name || "Ajith Manalath"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Phone</span>
                      <span className="text-sm text-gray-900">{admin.phone || "+91 9876543210"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Role</span>
                      <span className="text-sm text-gray-900">{admin.roles || "Maker"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Created By</span>
                      <span className="text-sm text-gray-900">{admin.createdBy || "Super Admin"}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Email</span>
                      <span className="text-sm text-gray-900">{admin.email || "ajith@erp.com"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Admin Type</span>
                      <span className="text-sm text-gray-900">{admin.roles || "Finance Admin"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Status</span>
                      <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                        admin.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {admin.status || "Active"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700 mb-1">Last Activity</span>
                      <span className="text-sm text-gray-900">{admin.lastActivity || "2025-07-17"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Trail - Reduced Height */}
            <div className="space-y-3">
              <h3 className="text-md font-semibold">Audit Trail</h3>
              <div className="border rounded-lg">
                <div className="max-h-40 overflow-y-auto">
                  <div className="space-y-1 p-3">
                    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Login Activity</p>
                        <p className="text-xs text-gray-600">Successful login from IP: 192.168.1.100</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Document Access</p>
                        <p className="text-xs text-gray-600">Accessed Financial Reports module</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Password Updated</p>
                        <p className="text-xs text-gray-600">Password changed successfully</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Admin Account Created</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-gray-500 text-sm">No admin data found</p>
          </div>
        )}

        <div className="flex justify-end border-t pt-3">
          <Button onClick={handleClose} size="sm">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}