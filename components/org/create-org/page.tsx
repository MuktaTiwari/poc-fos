"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

// import  ChevronLeft from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewOrg() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "ORGANIZATION",
    level: "4",
    parentId: "cmg6dmlln0001kcvf7qxx4hlb",
    isActive: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://172.1.0.9:3000/business", {
        name: form.name,
        type: form.type,
        isActive: form.isActive,
        parentId: form.parentId,
      });

      console.log("Saved Data:", form);
      router.push("/dashboard/org");
    } catch (error) {
      console.error("Error saving the data:", error);
    }
  };

  return (
    <div className="max-w-4xl rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800 dark:text-gray-100">
      <div className="mb-2">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-100 dark:hover:text-white"
          onClick={() => router.push("/dashboard/org")}
        >
          <ChevronLeft className="size-5" />
          Back
        </Button>
      </div>
      <h1 className="mb-8 text-3xl font-extrabold text-gray-800 dark:text-gray-100">
        Create Organization
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Grid for form fields */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="name"
              className="font-medium text-gray-700 dark:text-gray-100"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter organization name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Code */}
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="code"
              className="font-medium text-gray-700 dark:text-gray-100"
            >
              Code
            </Label>
            <Input
              id="code"
              placeholder="Unique organization code"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-4">
            <Label className="font-medium text-gray-700 dark:text-gray-100">
              Type
            </Label>
            <Select
              onValueChange={(val) => handleChange("type", val)}
              value={form.type}
            >
              <SelectTrigger className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent className="dark:border-gray-600 dark:bg-gray-700">
                <SelectItem
                  value="ORGANIZATION"
                  className="dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Organization
                </SelectItem>
                <SelectItem
                  value="COMPANY"
                  className="dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Company
                </SelectItem>
                <SelectItem
                  value="DEPARTMENT"
                  className="dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Department
                </SelectItem>
                <SelectItem
                  value="TEAM"
                  className="dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Team
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Level */}
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="level"
              className="font-medium text-gray-700 dark:text-gray-100"
            >
              Level
            </Label>
            <Input
              id="level"
              type="number"
              placeholder="Enter hierarchy level"
              value={form.level}
              onChange={(e) => handleChange("level", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Active Status (full-width) */}
          <div className="col-span-1 mt-2 flex items-center space-x-3 md:col-span-2">
            <Checkbox
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(val) => handleChange("isActive", Boolean(val))}
              className="size-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
            />
            <Label
              htmlFor="isActive"
              className="font-medium text-gray-700 dark:text-gray-100"
            >
              Active
            </Label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-4">
          <Button
            type="submit"
            className="rounded-lg px-6 py-2 shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Create
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-gray-300 px-6 py-2 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={() => router.push("/dashboard/org")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
