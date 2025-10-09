"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function DeleteAdminPopup() {
  const router = useRouter();
  const { id } = useParams();
  const [admin, setAdmin] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const fetchAdminDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/users/${id}`);
      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAdminDetails();
    }
  }, [id, fetchAdminDetails]);

  const handleDelete = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3002/users/${id}`);
      router.push("/allAdmin");
    } catch (error) {
      console.error("Error deleting admin:", error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/allAdmin");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{admin?.name || `Admin ${id}`}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the admin
            account and remove all associated data.
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