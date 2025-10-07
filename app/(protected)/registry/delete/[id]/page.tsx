"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"
import { env } from "@/env.mjs"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function DeleteRegistryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string;

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
  }, [isOpen, router]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${env.NEXT_PUBLIC_APP_URL}/business/${id}`)
      toast.success("registry deleted successfully")
      router.push("/registry")
    } catch (error) {
      console.error("Failed to delete registry:", error)
      toast.error("Failed to delete registry")
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this registry? This will delete all
            children contained within it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
