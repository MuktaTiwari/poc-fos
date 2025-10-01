"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SERPFormData {
  id?: number;
  name: string;
  type: string;
  parentId?: string; // <-- store selected parent id
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

export default function SerpAddPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SERPFormData>({ name: "", type: "" });
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]); // dropdown options

  // Fetch all businesses for parent dropdown
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/business?type=PERP");
        setParentOptions(response.data.data); 
      } catch (err) {
        console.error("Error fetching businesses:", err);
      }
    };
    fetchBusinesses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: formData.name,
        type: formData.type,
        parentId: formData.parentId, // include selected parent
      };

      if (formData.companyName) payload.companyName = formData.companyName;
      if (formData.panNumber) payload.panNumber = formData.panNumber;
      if (formData.tan) payload.tan = formData.tan;
      if (formData.gst) payload.gst = formData.gst;
      if (formData.address) payload.address = formData.address;
      if (formData.pinCode) payload.pinCode = formData.pinCode;
      if (formData.state) payload.state = formData.state;
      if (formData.country) payload.country = formData.country;

      await axios.post("http://localhost:3000/business", payload);

      router.push("/dashboard/serpList");
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="max-w-2xl rounded-lg bg-card p-8 shadow-lg">
        <div className="mb-8 flex items-center gap-3">
          <button onClick={() => router.push("/dashboard/serpList")} className="flex items-center text-gray-600 hover:text-primary">
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
        <h1 className="text-2xl font-bold">Add New REGISTRY</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" value={formData.type} onChange={handleInputChange} required />
          </div>

          {/* Parent Name Dropdown */}
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
            <Input id="companyName" name="companyName" value={formData.companyName || ""} onChange={handleInputChange} />
          </div>

          {/* PAN, TAN, GST */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input id="panNumber" name="panNumber" value={formData.panNumber || ""} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="tan">TAN</Label>
              <Input id="tan" name="tan" value={formData.tan || ""} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="gst">GST</Label>
              <Input id="gst" name="gst" value={formData.gst || ""} onChange={handleInputChange} />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <textarea id="address" name="address" value={formData.address || ""} onChange={handleInputChange} className="w-full rounded-md border p-2" rows={3} />
          </div>

          {/* Pin Code, State, Country */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input id="pinCode" name="pinCode" value={formData.pinCode || ""} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" name="state" value={formData.state || ""} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <select id="country" name="country" value={formData.country || ""} onChange={handleInputChange} className="w-full rounded-md border p-2">
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
