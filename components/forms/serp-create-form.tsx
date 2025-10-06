"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SERPFormData } from "@/lib/type";
import { serpSchema } from "@/lib/validations/serpValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SerpFormType = z.infer<typeof serpSchema>;

interface SerpFormProps {
  initialData?: SERPFormData; // for edit
  parentOptions: SERPFormData[]; // dropdown
  onSubmit: (data: SerpFormType) => void;
  onCancel?: () => void;
}

export default function SerpForm({
  initialData,
  parentOptions,
  onSubmit,
  onCancel,
}: SerpFormProps) {
  const form = useForm<SerpFormType>({
    resolver: zodResolver(serpSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type,
      parentId: initialData?.immediateParent?.id || "",
      panNo: initialData?.panNo || "",
      tanNo: initialData?.tanNo || "",
      gstNo: initialData?.gstNo || "",
      address: initialData?.address || "",
      pincode: initialData?.pincode || "",
      state: initialData?.state || "",
      country: initialData?.country || "",
      isActive: initialData?.isActive ?? true,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter the SERP name"
        />
        {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Type */}
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={watch("type") || ""}
          onValueChange={(val: "PERP" | "SERP" | "REGISTRY" | "ORG" | "CU") =>
            setValue("type", val)
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
        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
      </div>

      {/* Parent */}
      <div>
        <Label htmlFor="parentId">Parent</Label>
        <Select
          value={watch("parentId") || ""}
          onValueChange={(val) => setValue("parentId", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Parent" />
          </SelectTrigger>
          <SelectContent>
            {parentOptions.map((p) => (
              <SelectItem key={p.id} value={p.id?.toString() || ""}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PAN, TAN, GST */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="panNo">PAN</Label>
          <Input id="panNo" {...register("panNo")} />
          {errors.panNo && (
            <p className="text-sm text-red-500">{errors.panNo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="tanNo">TAN</Label>
          <Input id="tanNo" {...register("tanNo")} />
          {errors.tanNo && (
            <p className="text-sm text-red-500">{errors.tanNo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="gstNo">GST</Label>
          <Input id="gstNo" {...register("gstNo")} />
          {errors.gstNo && (
            <p className="text-sm text-red-500">{errors.gstNo.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address">Address</Label>
        <textarea
          id="address"
          {...register("address")}
          className="w-full rounded-md border p-2"
          rows={3}
        />
      </div>

      {/* Pin, State, Country */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="pincode">Pin Code</Label>
          <Input id="pincode" {...register("pincode")} />
          {errors.pincode && (
            <p className="text-sm text-red-500">{errors.pincode.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" {...register("state")} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <select
            {...register("country")}
            className="w-full rounded-md border p-2"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          defaultChecked={initialData?.isActive ?? true}
          className="size-5"
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{initialData ? "Update" : "Save"}</Button>
      </div>
    </form>
  );
}
