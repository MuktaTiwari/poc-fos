"use client";

import { useEffect, useState, useTransition } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { adminSchema } from "@/lib/validations/admin";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/shared/icons";

interface Admin {
  id?: string;
  name: string;
  roles: string;
  status: string;
  email: string;
  phone: string;
  createdBy: string;
  createdOn: string;
  lastActivity: string;
}
interface AdminCreateFormProps {
  admin?: Admin;
  router: AppRouterInstance;
}

type FormData = z.infer<typeof adminSchema>;

export default function AdminCreateForm({
  admin,
  router,
}: AdminCreateFormProps) {
  const [isPending, startTransition] = useTransition();

  const isEditMode = !!admin;

  const form = useForm<FormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      roles: "",
      status: "",
      email: "",
      phone: "",
      createdBy: "",
      createdOn: "",
      lastActivity: "",
    },
  });

useEffect(() => {
  if (isEditMode && admin) {
    form.reset({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      status: admin.status || "",
      roles: admin.roles || "",
      createdBy: admin.createdBy || "",
      createdOn: admin.createdOn
        ? new Date(admin.createdOn).toISOString().split("T")[0]
        : "",
      lastActivity: admin.lastActivity
        ? new Date(admin.lastActivity).toISOString().split("T")[0]
        : "",
    });
  }
}, [isEditMode, admin, form]);

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        if (isEditMode && admin) {
          // ✅ EDIT MODE → use PUT
          const response = await axios.put(
            `http://localhost:3002/users/${admin.id}`,
            data,
          );
          toast.success("Admin updated successfully");
        } else {
          // ✅ CREATE MODE → use POST
          const response = await axios.post(
            "http://localhost:3002/users",
            data,
          );
          toast.success("Admin created successfully");
        }

        router.push("/allAdmin");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter admin name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Finance Admin" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="+91 9876543210" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Created By */}
        <FormField
          control={form.control}
          name="createdBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Created By *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Super Admin" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Created On */}
        <FormField
          control={form.control}
          name="createdOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Created On *</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Activity */}
        <FormField
          control={form.control}
          name="lastActivity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Activity *</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-8 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Back
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
            {isEditMode ? "Update Admin" : "Create Admin"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
