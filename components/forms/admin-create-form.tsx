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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/shared/icons";
import { env } from "@/env.mjs";

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

export default function AdminCreateForm({ admin, router }: AdminCreateFormProps) {
  const [isPending, startTransition] = useTransition();
  const [rolesOptions, setRolesOptions] = useState<string[]>([]);
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
    if (isEditMode && admin && rolesOptions.length > 0) {
      const roleValue = rolesOptions.includes(admin.roles) ? admin.roles : "";
      form.reset({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        status: admin.status || "",
        roles: roleValue,
        createdBy: admin.createdBy || "",
        createdOn: admin.createdOn ? new Date(admin.createdOn).toISOString().split("T")[0] : "",
        lastActivity: admin.lastActivity ? new Date(admin.lastActivity).toISOString().split("T")[0] : "",
      });
    }
  }, [isEditMode, admin, rolesOptions, form]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/roles`);
        if (Array.isArray(response.data)) {
          const roleNames = response.data.map((role: any) => role.name);
          setRolesOptions(roleNames);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        if (isEditMode && admin) {
          await axios.put(`${env.NEXT_PUBLIC_API_URL}/users/${admin.id}`, data);
          toast.success("Admin updated successfully");
        } else {
          await axios.post(`${env.NEXT_PUBLIC_API_URL}/users`, data);
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
      <div className="flex flex-col max-h-[80vh]  rounded-xl">
        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-4 flex-1">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* BASIC INFO SECTION */}
            <div className="space-y-4 ">
              <h3 className="text-md font-semibold">Basic Info</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter full name" />
                      </FormControl>
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
                      <FormLabel>Email ID *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter email address" type="email" disabled={isEditMode} />
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
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+91 9876543210" />
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
              </div>
            </div>

            {/* ROLE SETUP SECTION */}
            <div className="space-y-4 ">
              <h3 className="text-md font-semibold">Role Setup</h3>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Role Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isEditMode}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rolesOptions.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4 ">
              <h3 className="text-md font-semibold">Additional Info</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Created By */}
                <FormField
                  control={form.control}
                  name="createdBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Created By</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter creator name (optional)" />
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
                      <FormLabel>Created On</FormLabel>
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
                      <FormLabel>Last Activity</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* PASSWORD SECTION */}
            {!isEditMode && (
              <div className="space-y-2 border rounded-xl p-4 shadow-sm bg-gray-50 ">
                <h3 className="text-md font-semibold">Password Setup</h3>
                <p>New Admin will receive a secure &quot;Set Password&quot; link via email/phone after creation.</p>

              </div>
            )}


          </form>
        </div>

        {/* Fixed Action Buttons */}
        <div className="flex justify-end gap-4 p-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
            {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
            {isEditMode ? "Update Admin" : "Create Admin"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
