"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { userRoleSchema } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionColumns } from "@/components/dashboard/section-columns";
import { Icons } from "@/components/shared/icons";

// Mock UserRole enum - replace with actual type
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

interface UserRoleFormProps {
  user: { id: string; role: string };
}

type FormData = z.infer<typeof userRoleSchema>;

export function UserRoleForm({ user }: UserRoleFormProps) {
  const [updated, setUpdated] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const roles = Object.values(UserRole);
  const [role, setRole] = useState(user.role);

  const form = useForm<FormData>({
    resolver: zodResolver(userRoleSchema),
    values: {
      role: role,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`/api/user/${user.id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      setUpdated(false);
      toast.success("Your role has been updated.");
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Your role was not updated. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SectionColumns
          title="Your Role"
          description="Select the role what you want for test the app."
        >
          <div className="flex w-full items-center gap-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel className="sr-only">Role</FormLabel>
                  <Select
                    onValueChange={(value: string) => {
                      setUpdated(user.role !== value);
                      setRole(value);
                    }}
                    name={field.name}
                    defaultValue={user.role}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role.toString()}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={updated ? "default" : "disable"}
              disabled={isPending || !updated}
              className="w-[67px] shrink-0 px-0 sm:w-[130px]"
            >
              {isPending ? (
                <Icons.spinner className="size-4 animate-spin" />
              ) : (
                <p>
                  Save
                  <span className="hidden sm:inline-flex">&nbsp;Changes</span>
                </p>
              )}
            </Button>
          </div>
          <div className="flex flex-col justify-between p-1">
            <p className="text-[13px] text-muted-foreground">
              Remove this field on real production
            </p>
          </div>
        </SectionColumns>
      </form>
    </Form>
  );
}
