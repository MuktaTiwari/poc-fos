"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SERPFormData {
  name: string;
  type: number;
  isActive: string;
}

export default function SerpAddPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SERPFormData>({
    name: "",
    type: 0,
    isActive: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "type" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
    router.push("/dashboard/serpList");
  };

  const handleCancel = () => {
    router.push("/dashboard/serpList");
  };

  return (
    <main className="min-h-screen bg-background p-10 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-4xl rounded-lg bg-card p-10 text-card-foreground shadow-lg transition-colors duration-300">
        <h1 className="mb-6 text-2xl font-semibold">Add New SERP</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Keyword */}
          <div className="flex flex-col">
            <Label htmlFor="name">Keyword</Label>
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

          {/* Rank */}
          <div className="flex flex-col">
            <Label htmlFor="type">Rank</Label>
            <Input
              type="number"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Enter rank"
              required
            />
          </div>

          {/* URL */}
          <div className="flex flex-col">
            <Label htmlFor="isActive">URL</Label>
            <Input
              type="url"
              id="isActive"
              name="isActive"
              value={formData.isActive}
              onChange={handleInputChange}
              placeholder="Enter URL"
              required
            />
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
              className="rounded-md bg-muted px-6 py-3 font-medium text-muted-foreground transition-colors duration-300 hover:bg-muted/90"
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
