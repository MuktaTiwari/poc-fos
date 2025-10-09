"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { userNameSchema } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionColumns } from "@/components/dashboard/section-columns";
import { Icons } from "@/components/shared/icons";

interface UserNameFormProps {
  user: { id: string; name: string };
}

type FormData = z.infer<typeof userNameSchema>;

export function UserNameForm({ user }: UserNameFormProps) {
  const [updated, setUpdated] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const checkUpdate = (value: string) => {
    setUpdated(user.name !== value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`/api/user/${user.id}/name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update name');
      }

      setUpdated(false);
      toast.success("Your name has been updated.");
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Your name was not updated. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <SectionColumns
        title="Your Name"
        description="Please enter a display name you are comfortable with."
      >
        <div className="flex w-full items-center gap-2">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            className="flex-1"
            size={32}
            {...register("name")}
            onChange={(e) => checkUpdate(e.target.value)}
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
          {errors?.name && (
            <p className="pb-0.5 text-[13px] text-red-600">
              {errors.name.message}
            </p>
          )}
          <p className="text-[13px] text-muted-foreground">Max 32 characters</p>
        </div>
      </SectionColumns>
    </form>
  );
}
