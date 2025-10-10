"use client";

import axios from "axios";
import { toast } from "sonner";
import { logger } from "@/lib/logger";

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
  organizationName: string;
  onSuccess: () => void;
}

export function DeleteOrganizationDialog({
  children,
  organizationId,
  organizationName,
  onSuccess,
}: DeleteOrganizationDialogProps) {

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business/${organizationId}`);

     
      toast.success(`Organization "${organizationName}" deleted successfully`, {
        description: "The organization and all related data have been removed.",
        duration: 4000,
      });

      onSuccess();
    } catch (error) {
     
      toast.error(`Failed to delete "${organizationName}"`, {
        description: "Something went wrong while deleting the organization.",
        duration: 4000,
      });
      logger.error("Error deleting organization", { error });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="border border-border bg-background shadow-lg sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-primary">
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{organizationName}</strong>? <br />
            <strong className="text-destructive">This action is permanent!</strong>{" "}
            All data related to this organization will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel className="rounded bg-muted px-4 py-2 text-foreground hover:bg-muted">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
           
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
