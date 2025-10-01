"use client";

import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteOrganizationDialogProps {
  children: React.ReactNode;
  organizationId: string;
  onSuccess: () => void;
}

export function DeleteOrganizationDialog({
  children,
  organizationId,
  onSuccess,
}: DeleteOrganizationDialogProps) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/business/${organizationId}`);
      toast.success(
        "Organization and all related data have been deleted successfully ✅",
      );
      onSuccess();
    } catch (error) {
      toast.error("Failed to delete the organization ❌");
      console.error("Error deleting organization:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-red-700">
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this organization? <br />
            <strong className="text-red-600">
              This action is permanent!
            </strong>{" "}
            All data related to this organization, 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
