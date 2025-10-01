'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { User } from 'next-auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import { createRegistry } from '@/actions/create-registry';
import { registrySchema } from '@/lib/validations/registry';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/shared/icons';
import axios from 'axios';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { env } from '@/env.mjs';

interface Registry {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  parentId?: string;
  panNo?: string,
  tanNo?: string,
  gstNo?: string,
  address?: string,
  pincode?: string,
  state?: string,
  country?: string,
}

interface RegistryCreateFormProps {
  user?: User;
  registry?: Registry;
  router: AppRouterInstance;
}

type FormData = z.infer<typeof registrySchema>;

export default function RegistryCreateForm({
  registry,
  router,
}: RegistryCreateFormProps) {
  const [isPending, startTransition] = useTransition();
  const [parentList, setParentList] = useState<Registry[]>([]);

  const isEditMode = !!registry;

  const form = useForm<FormData>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      name: "",
      type: "",
      parentId: "",
      isActive: true,
      panNo: "",
      tanNo: "",
      gstNo: "",
      address: "",
      pincode: "",
      state: "",
      country: "",
    },
  });

  const typeValue = form.watch('type');

  useEffect(() => {
    if (typeValue) {
      const fetchParents = async () => {
        try {
          const response = await axios.get(`${env.NEXT_PUBLIC_APP_URL}/business?type=SERP`);
          console.log(response.data.data)
          setParentList(response.data.data);
        } catch (error) {
          toast.error('Failed to fetch parent list.');
          setParentList([]);
        }
      };
      fetchParents();
    } else {
      setParentList([]);
    }
  }, [typeValue]);


  useEffect(() => {
    if (isEditMode && registry) {
      form.reset({
        name: registry.name,
        type: registry.type,
        parentId: registry.parentId || "",
        isActive: registry.isActive,
        panNo: registry.panNo,
        tanNo: registry.tanNo,
        gstNo: registry.gstNo,
        address: registry.address,
        pincode: registry.pincode,
        state: registry.state,
        country: registry.country,
      });
    }
  }, [isEditMode, registry, form]);

  const onSubmit = (data: FormData) => {

    startTransition(async () => {

      try {
        if (isEditMode && registry) {
          await axios.patch(
            `${env.NEXT_PUBLIC_APP_URL}/business/${registry.id}`,
            data
          );
          toast.success("Registry updated successfully!");
        } else {
          await axios.post(`${env.NEXT_PUBLIC_APP_URL}/business`, data);
          toast.success("Registry created successfully!");
          form.reset();
        }
        router.push("/registry");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
            />
            <p className="text-sm text-muted-foreground">
              This is the name of your Registry.
            </p>
            {form.formState.errors?.name && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('parentId', '');
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PERP">PERP</SelectItem>
                    <SelectItem value="SERP">SERP</SelectItem>
                    <SelectItem value="REGISTRY">REGISTRY</SelectItem>
                    <SelectItem value="ORGANIZATION">ORGANIZATION</SelectItem>
                    <SelectItem value="CU">CU</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The type of your business</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Parent</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={parentList.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SERP" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parentList.map((parent) => (
                      <SelectItem key={parent.id} value={parent.id}>
                        {parent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  If you want to create a registry , select in which  SERP  you want to create.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="panNo">PAN No</Label>
            <Input id="panNo" {...form.register("panNo")} />
            {form.formState.errors?.panNo && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.panNo.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tanNo">TAN No</Label>
            <Input id="tanNo" {...form.register("tanNo")} />
            {form.formState.errors?.tanNo && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.tanNo.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gstNo">GST No</Label>
            <Input id="gstNo" {...form.register("gstNo")} />
            {form.formState.errors?.gstNo && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.gstNo.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...form.register("address")} />
            {form.formState.errors?.address && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" {...form.register("pincode")} />
            {form.formState.errors?.pincode && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.pincode.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" {...form.register("state")} />
            {form.formState.errors?.state && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.state.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...form.register("country")} />
            {form.formState.errors?.country && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.country.message}
              </p>
            )}
          </div>


        </div>

        <div className="mt-8 flex justify-end gap-4">
          {/* {isEditMode && ( */}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Back
          </Button>
          {/* )} */}
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {isEditMode ? "Update Registry" : "Create Registry"}
          </Button>
        </div>
      </form>
    </Form >
  );
}