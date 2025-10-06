"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrgFormProps = {
  isEdit?: boolean;
  id?: string; // required only if isEdit
};

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  type: z.string().nonempty("Type is required"),
  registry: z.string().optional(),
  parentId: z.string().optional(),
  panNo: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val),
      "PAN number must be in format XXXXX9999X (e.g., ABCDE1234F)",
    ),
  tanNo: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(val),
      "TAN number must be in format XXXX99999X (e.g., ABCD12345E)",
    ),
    
  gstNo: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val),
      "GST number must be in format 99XXXXX9999X9X9X (e.g., 29ABCDE1234F1Z5)",
    ),
  pincode: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{6}$/.test(val),
      "Pincode must be exactly 6 digits (e.g., 560001)",
    ),
  address: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function OrgForm({ isEdit = false, id }: OrgFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registries, setRegistries] = useState<{ id: string; name: string }[]>(
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "ORGANIZATION",
      registry: "",
      parentId: "",
      panNo: "",
      gstNo: "",
      tanNo: "",
      address: "",
      pincode: "",
      state: "",
      country: "",
      isActive: true,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

        // Fetch registries
        const registriesRes = await axios.get(
          `${baseUrl}/business?type=REGISTRY`,
        );
        const allRegistries = registriesRes.data?.data ?? [];
        setRegistries(allRegistries);

        // If edit, fetch org details
        if (isEdit && id) {
          const orgRes = await axios.get(`${baseUrl}/business/${id}`);
          const orgData = orgRes.data?.data ?? orgRes.data;

          const selectedRegistry = allRegistries.find(
            (r) => r.id === orgData.immediateParent?.id,
          );

          form.reset({
            name: orgData?.name ?? "",
            type: orgData?.type ?? "ORGANIZATION",
            registry: selectedRegistry?.id ?? "",
            parentId: orgData.immediateParent?.id ?? "",
            panNo: orgData?.panNo ?? "",
            gstNo: orgData?.gstNo ?? "",
            tanNo: orgData?.tanNo ?? "",
            address: orgData?.address ?? "",
            pincode: orgData?.pincode ?? "",
            state: orgData?.state ?? "",
            country: orgData?.country ?? "",
            isActive: Boolean(orgData?.isActive ?? true),
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      // Remove blank optional fields
      const payload = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "" && v !== null),
      );

      // Add parentId logic
      payload.parentId = values.registry || values.parentId || "";

      if (isEdit && id) {
        await axios.patch(`${baseUrl}/business/${id}`, payload);
        toast.success("Organization updated successfully!");
      } else {
        await axios.post(`${baseUrl}/business`, payload);
        toast.success("Organization created successfully!");
      }

      router.push("/org");
    } catch (err: any) {
      if (err.response?.data?.message) {
        // Show backend validation errors
        const messages = Array.isArray(err.response.data.message)
          ? err.response.data.message.join("\n")
          : err.response.data.message;
        toast.error(messages);
      } else {
        toast.error("Failed to save data");
      }
      console.error("Error saving data:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-extrabold text-gray-800">
        {isEdit ? "Update Organization" : "Add Organization"}
      </h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Fields */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERP">PERP</SelectItem>
                        <SelectItem value="SERP">SERP</SelectItem>
                        <SelectItem value="REGISTRY">REGISTRY</SelectItem>
                        <SelectItem value="ORGANIZATION">
                          ORGANIZATION
                        </SelectItem>
                        <SelectItem value="CU">CU</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Registry */}
          <FormField
            control={form.control}
            name="registry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registry</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={registries.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select registry" />
                    </SelectTrigger>
                    <SelectContent>
                      {registries.map((reg) => (
                        <SelectItem key={reg.id} value={reg.id}>
                          {reg.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional fields */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              { name: "panNo", label: "PAN Number" },
              { name: "gstNo", label: "GST Number" },
              { name: "tanNo", label: "TAN Number" },
              { name: "address", label: "Address" },
              { name: "pincode", label: "PIN Code" },
              { name: "state", label: "State" },
              { name: "country", label: "Country" },
            ].map((fieldDef) => (
              <FormField
                key={fieldDef.name}
                control={form.control}
                name={fieldDef.name as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldDef.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${fieldDef.label.toLowerCase()}`}
                        value={field.value as string}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="col-span-1 mt-2 flex items-center space-x-3 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Active</FormLabel>
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="mt-4 flex flex-wrap justify-end gap-4">
            <Button
              type="submit"
              className="rounded-lg px-6 py-2 shadow-md"
              disabled={saving}
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-gray-300 px-6 py-2 shadow-sm hover:bg-gray-50"
              onClick={() => router.push("/org")}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}