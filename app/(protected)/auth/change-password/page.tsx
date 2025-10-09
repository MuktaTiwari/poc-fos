"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ChangePasswordPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to your action/api
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
            <Lock className="mt-0.5 size-5 text-muted-foreground" />
            <div className="space-y-1">
  <CardTitle className="font-heading">Password Settings</CardTitle>
  <CardDescription>
    Choose a strong password to keep your account secure
  </CardDescription>
</div>

          </div>
        </CardHeader>
        <CardContent>
  <form onSubmit={onSubmit} className="space-y-5">
    {/* Current Password */}
    <div className="space-y-2">
      <Label
        htmlFor="currentPassword"
        className="text-gray-700 text-sm font-medium"
      >
        Current Password
      </Label>
      <div className="relative">
        <Input
          id="currentPassword"
          type={showCurrent ? "text" : "password"}
          placeholder="Enter current password"
          autoComplete="current-password"
          className="pr-10 bg-gray-100 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          type="button"
          aria-label={showCurrent ? "Hide password" : "Show password"}
          onClick={() => setShowCurrent((p) => !p)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>

    {/* New Password */}
    <div className="space-y-2">
      <Label
        htmlFor="newPassword"
        className="text-gray-700 text-sm font-medium"
      >
        New Password
      </Label>
      <div className="relative">
        <Input
          id="newPassword"
          type={showNew ? "text" : "password"}
          placeholder="Enter new password"
          autoComplete="new-password"
          className="pr-10 bg-gray-100 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          type="button"
          aria-label={showNew ? "Hide password" : "Show password"}
          onClick={() => setShowNew((p) => !p)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>

    {/* Confirm New Password */}
    <div className="space-y-2">
      <Label
        htmlFor="confirmPassword"
        className="text-gray-700 text-sm font-medium"
      >
        Confirm New Password
      </Label>
      <div className="relative">
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm new password"
          autoComplete="new-password"
          className="pr-10 bg-gray-100 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          type="button"
          aria-label={showConfirm ? "Hide password" : "Show password"}
          onClick={() => setShowConfirm((p) => !p)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>

    <div className="pt-2">
      <Button
        type="submit"
        className="w-full"
      >
        Change Password
      </Button>
    </div>
  </form>
</CardContent>

      </Card>
    </div>
  );
}