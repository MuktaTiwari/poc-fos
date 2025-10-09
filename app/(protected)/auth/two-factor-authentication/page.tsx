"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";

export default function TwoFactorAuthPage() {
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
          <CardDescription >
            Choose your preferred channel for receiving two-factor
            authentication code during login process. The selected preferred
            channel for 2FA validation may not always be used. If unavailable,
            it will fall back to the next available channel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="preferred-channel"
              className="text-sm font-medium"
            >
              Select Preferred Channel
            </label>
            <Select defaultValue="sms">
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
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
