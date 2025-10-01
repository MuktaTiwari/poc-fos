"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

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

type UpdateOrgProps = {
  id: string;
};

export default function UpdateOrg({ id }: UpdateOrgProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "ORGANIZATION",
    level: "4",
    parentId: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://172.1.0.9:3000/business/${id}`);
        const apiBody = res?.data;
        const data = (apiBody && typeof apiBody === "object" && "data" in apiBody)
          ? (apiBody as any).data
          : apiBody;

        setForm({
          name: data?.name ?? "",
          code: data?.code ?? "",
          type: data?.type ?? "ORGANIZATION",
          level: String(data?.level ?? "4"),
          parentId: data?.parentId ?? "",
          isActive: Boolean(data?.isActive ?? true),
        });
        setError(null);
      } catch (err: any) {
        console.error("Error fetching organization:", err);
        setError("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrg();
  }, [id]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`http://172.1.0.9:3000/business/${id}`, {
        name: form.name,
        type: form.type,
        isActive: form.isActive,
        parentId: form.parentId || null,
      });
      router.push("/dashboard/org");
    } catch (err) {
      console.error("Error updating organization:", err);
      setError("Failed to update organization");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl rounded-2xl bg-white p-8 shadow-md">
        <p>Loading organization...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl rounded-2xl bg-white p-8 shadow-md">
      <div className="mb-2">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          onClick={() => router.push("/dashboard/org")}
        >
          <ChevronLeft className="size-5" />
          Back
        </Button>
      </div>

      <h1 className="mb-8 text-3xl font-extrabold text-gray-800">Update Organization</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter organization name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="code" className="font-medium text-gray-700">
              Code
            </Label>
            <Input
              id="code"
              placeholder="Unique organization code"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label className="font-medium text-gray-700">Type</Label>
            <Select onValueChange={(val) => handleChange("type", val)} value={form.type}>
              <SelectTrigger className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ORGANIZATION">Organization</SelectItem>
                <SelectItem value="COMPANY">Company</SelectItem>
                <SelectItem value="DEPARTMENT">Department</SelectItem>
                <SelectItem value="TEAM">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="level" className="font-medium text-gray-700">
              Level
            </Label>
            <Input
              id="level"
              type="number"
              placeholder="Enter hierarchy level"
              value={form.level}
              onChange={(e) => handleChange("level", e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1 mt-2 flex items-center space-x-3 md:col-span-2">
            <Checkbox
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(val) => handleChange("isActive", Boolean(val))}
              className="size-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="isActive" className="font-medium text-gray-700">
              Active
            </Label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <Button type="submit" className="rounded-lg px-6 py-2 shadow-md" disabled={saving}>
            {saving ? "Saving..." : "Update"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border-gray-300 px-6 py-2 shadow-sm hover:bg-gray-50"
            onClick={() => router.push("/dashboard/org")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
