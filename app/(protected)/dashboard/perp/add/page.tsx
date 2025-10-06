'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { toast } from '@/components/ui/use-toast';
import { DashboardHeader } from '@/components/dashboard/header';
import { createBusiness } from '../api';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  type: z.string().min(2, 'Type must be at least 2 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export default function AddPerpPage() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'PERP',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createBusiness(data);
      toast({
        title: 'Success',
        description: 'PERP created successfully.',
      });
      router.push('/dashboard/perp');
    } catch (error) {
      console.error('Error creating PERP:', error);
      toast({
        title: 'Error',
        description: 'Failed to create PERP. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <DashboardHeader heading="Add PERP" text="Create a new PERP." />
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
                    <Input placeholder="Enter type" {...field} />
                  </FormControl>
                  <FormDescription>
                    The type of the business entity (e.g., PERP).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating...' : 'Create PERP'}
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