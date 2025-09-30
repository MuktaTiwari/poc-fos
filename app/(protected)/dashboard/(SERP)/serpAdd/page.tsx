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
    id: 0,
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
    e.preventDefault();

    try {
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
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-2xl rounded-lg bg-card p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center">Add New SERP</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="h-12 text-base"
              required
            />
          </div>

          {/* Type Field */}
          <div className="space-y-3">
            <Label htmlFor="type" className="text-base font-medium">
              Type
            </Label>
            <Input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Enter type"
              className="h-12 text-base"
              required
            />
          </div>

          {/* Active Checkbox - Custom Styled */}
          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-muted/20">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-5 w-5 rounded border-2 border-gray-300 bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>
            <Label
              htmlFor="isActive"
              className="text-base font-medium cursor-pointer"
            >
              Active
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-11 px-6 text-base font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}