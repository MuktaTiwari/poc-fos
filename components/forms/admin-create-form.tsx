"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { User } from "next-auth";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Icons } from "@/components/shared/icons";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { adminSchema } from "@/lib/validations/admin";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface admin {
    name: string;
    emailId: string;
    phoneNo?: string;
    status: boolean;
    adminType: string,
    assignRole: string,
}

interface AdminCreateFormProps {
    user?: User;
    admin?: admin;
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
            emailId: "",
            phoneNo: "",
            status: true,
            adminType: "",
            assignRole: "",
        },
    });

    useEffect(() => {
        if (isEditMode && admin) {
            form.reset({
                name: admin.name,
                emailId: admin.emailId,
                phoneNo: admin.phoneNo,
                status: admin.status,
                adminType: admin.adminType,
                assignRole: admin.assignRole,
            });
        }
    }, [isEditMode, admin, form]);

    const onSubmit = (data: FormData) => {
        startTransition(async () => {
            try {
                const response = await axios.post("/api/user", data);
                toast.success(response.data.message);
                router.push("/admin");
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        });
    };
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            {...form.register("name")}
                        />
                        {form.formState.errors?.name && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="emailId">Email Id *</Label>
                        <Input id="emailId" {...form.register("emailId")} />
                        {form.formState.errors?.emailId && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.emailId.message}
                            </p>
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="phoneNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <div className="flex">
                                    {/* Phone prefix mimic */}
                                    <div className="flex h-10 items-center rounded-l-md border border-r-0 bg-white px-3 text-sm text-gray-500">
                                        <span className="mr-2">🇮🇳</span> +91
                                    </div>
                                    <FormControl>
                                        <Input id="phoneNo" {...form.register("phoneNo")} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="adminType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="PERP">Active</SelectItem>
                                        <SelectItem value="SERP">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-4 mt-8 text-lg font-semibold">Role Setup</div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="adminType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select admin type *</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="financeAdmin">Finance admin</SelectItem>
                                        <SelectItem value="legalAdmin">Legal admin</SelectItem>
                                        <SelectItem value="salesAdmin">Sales admin</SelectItem>
                                        <SelectItem value="channelAdmin">Channel admin</SelectItem>
                                        <SelectItem value="supportAdmin">Support admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="assignRole"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Assign Role *</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex space-x-4 pt-2"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Maker" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Maker
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Checker" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Checker
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Password Setup Section */}
                <div className="mb-2 mt-8 text-lg font-semibold">Password Setup</div>
                <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-700">
                        New Admin will receive a secure Set Password link via email/phone after creation.
                    </p>
                </div>

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
                        {isPending && (
                            <Icons.spinner className="mr-2 size-4 animate-spin" />
                        )}
                        {isEditMode ? "Update admin" : "Create admin"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}