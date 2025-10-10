"use client";

import { useState } from "react";
import { Camera, Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName?.trim().charAt(0).toUpperCase() || "";
  const lastInitial = lastName?.trim().charAt(0).toUpperCase() || "";
  return `${firstInitial}${lastInitial}`;
};

export default function MyProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);

  // Dummy data
  const [profileData, setProfileData] = useState({
    firstName: "Nikhil",
    lastName: "Barapatre",
    role: "Software Engineer",
    department: "Technical",
    memberSince: "2025-10-09",
    lastLogin: "2025-10-09 10:30 AM",
    email: "nikhil.barapatre@1spoc.com",
    phone: "+91 9876543210",
    bio: "Responsible for managing the overall system and its components.",
  });

  const [formData, setFormData] = useState(profileData);

  const handleEdit = () => {
    setIsEditMode(true);
    setFormData(profileData);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData(profileData);
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditMode(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            {isEditMode
              ? "Update your personal details"
              : "Manage your personal information and preferences"}
          </p>
        </div>
        {!isEditMode ? (
          <Button className="gap-2" onClick={handleEdit}>
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button className="gap-2" onClick={handleCancel}>
              <X className="size-4" />
              Cancel
            </Button>
            <Button className="gap-2" onClick={handleSave}>
            <Save className="size-4"/>
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center pt-6">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="flex size-24 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
                {getInitials(profileData.firstName, profileData.lastName)}
              </div>
              {isEditMode && (
                <button
                  className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted hover:bg-muted/80"
                  aria-label="Upload profile picture"
                >
                  <Camera className="size-4" />
                </button>
              )}
            </div>

            {/* Name and Role */}
            <h2 className="mb-1 text-xl font-semibold">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">
              {profileData.role}
            </p>

            {/* Badge */}
            <Badge variant="secondary" className="mb-6">
              {profileData.department}
            </Badge>

            {/* Member Info */}
            <div className="w-full space-y-3 border-t pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Member Since
                </span>
                <span className="text-sm font-medium">
                  {new Date(profileData.memberSince).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Last Login
                </span>
                <span className="text-sm font-medium">
                  {profileData.lastLogin}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "Update your personal details"
                : "Your current personal information"}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                {isEditMode ? (
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                {isEditMode ? (
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                {isEditMode ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                {isEditMode ? (
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.phone}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Department
                </label>
                {isEditMode ? (
                  <Input
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter department"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.department}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Bio
                </label>
                {isEditMode ? (
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Enter bio"
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm font-medium">{profileData.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
