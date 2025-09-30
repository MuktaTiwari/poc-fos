'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEffect, useTransition } from 'react';
import { User } from 'next-auth';

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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SectionColumns } from '@/components/dashboard/section-columns';
import { Icons } from '@/components/shared/icons';
import axios from 'axios';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Registry {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
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
  const isEditMode = !!registry;

  const form = useForm<FormData>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      name: "",
      type: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (isEditMode && registry) {
      form.reset({
        name: registry.name,
        type: registry.type,
        isActive: registry.isActive,
      });
    }
  }, [isEditMode, registry, form]);

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        if (isEditMode && registry) {
          await axios.patch(
            `http://172.1.0.9:3000/business/${registry.id}`,
            data
          );
          toast.success("Organization updated successfully!");
        } else {
          const updatedData = { parentId: "cmg6cbr0x0001kcyeqvh5mnxl", ...data };
          await axios.post("http://172.1.0.9:3000/business", updatedData);
          toast.success("Organization created successfully!");
          form.reset();
        }
        router.push("/registry-list");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
            />
            <p className="text-sm text-muted-foreground">
              This is the name of your organization.
            </p>
            {form.formState.errors?.name && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              placeholder="e.g., PERP, SERP, REGISTRY, ORGANIZATION"
              {...form.register("type")}
            />
            <p className="text-sm text-muted-foreground">
              The type of your business or organization.
            </p>
            {form.formState.errors?.type && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.type.message}
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
            {isEditMode ? "Update Organization" : "Create Organization"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
