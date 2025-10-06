'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DashboardHeader } from "@/components/dashboard/header";
import { getBusinesses, updateBusiness } from "../api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.string().min(2, "Type must be at least 2 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function EditPerpPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "PERP",
    },
  });

  React.useEffect(() => {
    const fetchPerp = async () => {
      try {
        const businesses = await getBusinesses();
        const perp = businesses.find((b) => b.id === id);
        if (perp) {
          form.reset({
            name: perp.name,
            type: perp.type,
          });
        } else {
          throw new Error("PERP not found");
        }
      } catch (error) {
        console.error("Error fetching PERP:", error);
        toast({
          title: "Error",
          description: "Failed to load PERP data. Please try again.",
          variant: "destructive",
        });
        router.push("/dashboard/perp");
      }
    };

    fetchPerp();
  }, [id, form, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateBusiness(id, data);
      toast({
        title: "Success",
        description: "PERP updated successfully.",
      });
      router.push("/dashboard/perp");
    } catch (error) {
      console.error("Error updating PERP:", error);
      toast({
        title: "Error",
        description: "Failed to update PERP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DashboardHeader
        heading="Edit PERP"
        text={`Editing PERP: ${form.getValues("name") || "Loading..."}`}
      />
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter PERP name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the PERP.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter type" {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    The type of the business entity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
