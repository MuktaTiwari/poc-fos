"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardHeader } from "@/components/dashboard/header";

export interface SERPFormData {
  id?: number;
  name: string;
  type: string;
  parentId?: string;
  isActive?: boolean;
  companyName?: string;
  panNo?: string;
  tanNo?: string;
  gstNo?: string;
  address?: string;
  pincode?: string;
  state?: string;
  country?: string;
}

export default function SerpAddPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SERPFormData>({
    name: "",
    type: "",
  });
  const [parentOptions, setParentOptions] = useState<SERPFormData[]>([]);

  // Fetch parent options
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/business?type=PERP",
        );
        setParentOptions(response.data.data);
      } catch (err) {
        console.error("Error fetching businesses:", err);
      }
    };
    fetchBusinesses();
  }, []);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: formData.name,
        type: formData.type,
        parentId: formData.parentId,
      };

      if (formData.companyName) payload.companyName = formData.companyName;
      if (formData.panNo) payload.panNo = formData.panNo;
      if (formData.tanNo) payload.tanNo = formData.tanNo;
      if (formData.gstNo) payload.gstNo = formData.gstNo;
      if (formData.address) payload.address = formData.address;
      if (formData.pincode) payload.pincode = formData.pincode;
      if (formData.state) payload.state = formData.state;
      if (formData.country) payload.country = formData.country;

      await axios.post("http://localhost:3000/business", payload);

      router.push("/dashboard/serpList");
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };
  const form = useForm<SERPFormData>({
    defaultValues: {
      name: "",
      type: "",
    },
  });

  return (
    <Form {...form}>
      <DashboardHeader
        heading="Add Org form"
        text="Access only for users with ADMIN role."
      />

      {/* Form */}
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
          <p className="text-sm text-muted-foreground mt-2">
            Enter the registry name.
          </p>
        </div>

        {/* Type */}
        <div>
          <Label htmlFor="parentId">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, type: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERP">PERP</SelectItem>
              <SelectItem value="SERP">SERP</SelectItem>
              <SelectItem value="REGISTRY">REGISTRY</SelectItem>
              <SelectItem value="ORG">ORG</SelectItem>
              <SelectItem value="CU">CU</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground  mt-2">
            The type of your business or organization
          </p>
        </div>
        {/* Parent Dropdown */}
        <div>
          <Label htmlFor="parentId">Parent Name</Label>
          <Select
            value={formData.parentId || ""}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, parentId: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Parent" />
            </SelectTrigger>
            <SelectContent>
              {parentOptions.map((parent) => (
                <SelectItem key={parent.id} value={parent.id?.toString() || ""}>
                  {parent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground  mt-2">
            Choose the parent PERP (if applicable).
          </p>
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* PAN, TAN, GST */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="panNo">PAN Number</Label>
            <Input
              id="panNo"
              name="panNo"
              value={formData.panNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="tanNo">TAN</Label>
            <Input
              id="tanNo"
              name="tanNo"
              value={formData.tanNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="gstNo">GST</Label>
            <Input
              id="gstNo"
              name="gstNo"
              value={formData.gstNo || ""}
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

        {/* Pin, State, Country */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="pincode">Pin Code</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
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

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/serpList")}
          >
            Back
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
