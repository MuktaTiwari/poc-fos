"use client";

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const baseurl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      await axios.delete(`${baseurl}/business/${organizationId}`);
      toast({
        title: `Organization "${organizationName}" deleted`,
        description: `The organization "${organizationName}" and all related data were removed.`,
        variant: "destructive",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Failed to delete",
        description: `Something went wrong while deleting "${organizationName}".`,
        variant: "destructive",
      });
      console.error("Error deleting organization:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="border border-gray-200 bg-white shadow-lg sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-red-500">
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            Are you sure you want to delete <strong>{organizationName}</strong>? <br />
            <strong className="text-red-400">This action is permanent!</strong>{" "}
            All data related to this organization will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel className="rounded bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
