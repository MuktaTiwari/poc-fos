"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons"; // Import Icons
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Eye, EyeOff, Lock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true); // Set loading to true
    try {
      if (data.currentPassword === data.newPassword) {
        toast({
          title: "Error",
          description: "New password cannot be the same as current password.",
          variant: "destructive",
        });
        return; // Stop further execution
      }
  
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      toast({
        title: "Success",
        description: "Password changed successfully.",
        variant: "default",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: typeof error === "string" ? error : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Set loading to false
    }
  }
  

  return (
    <div className="w-full">
      <div className="mb-8">
        <DashboardHeader
          heading="Change Password"
          text="Update your account password for better security."
        />
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Lock className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <CardTitle className="font-heading">Password Settings</CardTitle>
              <CardDescription>
                Choose a strong password to keep your account secure
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-5">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-foreground text-sm font-medium">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    className="pr-10 bg-muted border border-border focus:bg-background focus:ring-2 focus:ring-primary transition-colors"
                    {...register("currentPassword")}
                  />
                  <button
                    type="button"
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                    onClick={() => setShowCurrent((p) => !p)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-destructive text-sm">{errors.currentPassword.message}</p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-foreground text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className="pr-10 bg-muted border border-border focus:bg-background focus:ring-2 focus:ring-primary transition-colors"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    aria-label={showNew ? "Hide password" : "Show password"}
                    onClick={() => setShowNew((p) => !p)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-destructive text-sm">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    className="pr-10 bg-muted border border-border focus:bg-background focus:ring-2 focus:ring-primary transition-colors"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Change Password
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
