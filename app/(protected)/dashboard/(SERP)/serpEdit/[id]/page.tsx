"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SERPFormData } from "../../serpAdd/page";

export default function SerpEditPage() {
  const { id } = useParams(); // URL param
  const router = useRouter();

  const [formData, setFormData] = useState<SERPFormData | null>(null);

  // fetch data by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<SERPFormData>(
          `http://localhost:3001/serp/${id}`
        );
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await axios.put(`http://localhost:3001/serp/${id}`, formData);
      console.log("Updated Data:", formData);
      router.push("/dashboard/serpList");
    } catch (error) {
      console.error("Error updating the data:", error);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/serpList");
  };

  if (!formData) {
    return (
      <main className="min-h-screen bg-background p-6 text-foreground">
        <div className="mx-auto max-w-2xl rounded-lg bg-card p-8 shadow-lg">
          <div className="flex items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-2xl rounded-lg bg-card p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold text-center">Edit SERP</h1>

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
              Update
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}