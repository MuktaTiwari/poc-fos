"use client";

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

import axios from "axios";
import { toast } from "sonner";

export function DeleteOrganizationDialog({
  children,
  organizationId,
  onSuccess,
}: {
  children: React.ReactNode;
  organizationId: string;
  onSuccess: () => void;
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/business/${organizationId}`);
      toast.success("Organization deleted successfully.");
      onSuccess();
    } catch (error) {
      toast.error("Failed to delete organization.");
      console.error("Error deleting organization:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="border border-border bg-background shadow-lg dark:bg-background sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this organization?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently remove the
            organization and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
