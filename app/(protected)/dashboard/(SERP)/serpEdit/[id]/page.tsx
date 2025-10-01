"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SERPFormData {
  id?: number;
  name: string;
  type: string;
  parentId?: string;
  isActive?: boolean;
  companyName?: string;
  panNumber?: string;
  tan?: string;
  gst?: string;
  address?: string;
  pinCode?: string;
  state?: string;
  country?: string;
}

export default function SerpEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<SERPFormData | null>(null);
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]); // Parent dropdown options

  // Fetch all businesses for parent dropdown
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/business?type=PERP");
        setParentOptions(res.data.data);
        console.log("Response for dropdown for fetching the Parent ::", res);
      } catch (err) {
        console.error("Error fetching parent businesses:", err);
      }
    };
    fetchBusinesses();
  }, []);

  // Fetch existing data by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/business/${id}`);
        const data = res.data.data;
        console.log("REsponse for esisting:", data);

        // Ensure all optional fields exist
        setFormData({
          id: data.id,
          name: data.name || "",
          type: data.type || "",
          parentId: data.perpId || "", // <-- use perpId from API
          isActive: data.isActive ?? false,
          companyName: data.companyName || "",
          panNumber: data.panNumber || "",
          tan: data.tan || "",
          gst: data.gst || "",
          address: data.address || "",
          pinCode: data.pinCode || "",
          state: data.state || "",
          country: data.country || "",
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!formData) return;

    const { name, value } = e.target;

    // Only HTMLInputElement has 'checked'
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => (prev ? { ...prev, [name]: checked } : prev));
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      // Build payload: send optional fields only if present
      const payload: any = {
        name: formData.name,
        type: formData.type,
        parentId: formData.parentId,
        isActive: formData.isActive,
      };
      if (formData.companyName) payload.companyName = formData.companyName;
      if (formData.panNumber) payload.panNumber = formData.panNumber;
      if (formData.tan) payload.tan = formData.tan;
      if (formData.gst) payload.gst = formData.gst;
      if (formData.address) payload.address = formData.address;
      if (formData.pinCode) payload.pinCode = formData.pinCode;
      if (formData.state) payload.state = formData.state;
      if (formData.country) payload.country = formData.country;

      await axios.patch(`http://localhost:3000/business/${id}`, payload);
      router.push("/dashboard/serpList");
    } catch (err: any) {
      console.error("Error updating data:", err.response?.data || err.message);
    }
  };

  const handleCancel = () => router.push("/dashboard/serpList");

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
        <h1 className="mb-8 text-center text-3xl font-bold">Edit SERP</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Parent Name */}
          <div>
            <Label htmlFor="parentId">Parent Name</Label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleInputChange}
              className="w-full rounded-md border p-2"
            >
              <option value="">Select Parent</option>
              {parentOptions.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Fields */}
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                name="panNumber"
                value={formData.panNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="tan">TAN</Label>
              <Input
                id="tan"
                name="tan"
                value={formData.tan || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="gst">GST</Label>
              <Input
                id="gst"
                name="gst"
                value={formData.gst || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
              className="w-full rounded-md border p-2"
              rows={3}
            />
          </div>

          {/* Pin Code, State, Country */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                id="pinCode"
                name="pinCode"
                value={formData.pinCode || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center space-x-3 rounded-lg border bg-muted/20 p-4">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive || false}
              onChange={handleInputChange}
              className="h-5 w-5 rounded border-2 border-gray-300 bg-background text-primary"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
