"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function TwoFactorAuthPage() {
  const [selectedChannel, setSelectedChannel] = useState("sms");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { toast } = useToast();

  async function handleSavePreferences() {
    setIsLoading(true); // Set loading to true
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: `2FA preferred channel updated to ${selectedChannel}.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update 2FA preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update 2FA preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Set loading to false
    }
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
         heading="Two Factor Authentication"
         text="Configure your two-factor authentication preferences."
/>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Shield className="h-6 w-6" />
            <span className="text-md">2FA Preferred Channel</span>
          </CardTitle>
          <CardDescription>
            Choose your preferred channel for receiving two-factor
            authentication code during login process. The selected preferred
            channel for 2FA validation may not always be used. If unavailable,
            it will fall back to the next available channel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="preferred-channel"
                  className="text-sm font-medium"
                >
                  Select Preferred Channel
                </Label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger id="preferred-channel" className="w-full">
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="authenticator">
                      Whatsapp
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSavePreferences} disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Save Preferences
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
