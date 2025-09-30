"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export interface SERPFormData {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
}

export default function SerpAddPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SERPFormData>({
    id: 0, // will be assigned by JSON Server
    name: "",
    type: "",
    isActive: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ stop reload first

    try {
      // ✅ post the new record to json-server
      await axios.post("http://localhost:3001/serp", {
        name: formData.name,
        type: formData.type,
        isActive: formData.isActive,
      });

      console.log("Saved Data:", formData);
      router.push("/dashboard/serpList");
    } catch (error) {
      console.error("Error saving the data:", error);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/serpList");
  };

  return (
    <main className="min-h-screen bg-background p-10 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-4xl rounded-lg bg-card p-10 text-card-foreground shadow-lg transition-colors duration-300">
        <h1 className="mb-6 text-2xl font-semibold">Add New SERP</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter keyword"
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <Label htmlFor="type">Type</Label>
            <Input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Enter type"
              required
            />
          </div>

          {/* Active / Inactive */}
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
            >
              Save
            </Button>
            <Button
              type="button"
              className="rounded-md bg-muted px-6 py-3 font-medium text-muted-foreground hover:bg-muted/90"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
