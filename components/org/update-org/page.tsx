"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
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

type UpdateOrgProps = {
  id: string;
};

// ✅ Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().optional(),
  type: z.string().nonempty("Type is required"),
  registry: z.string().optional(),
  parentId: z.string().optional(),
  companyName: z.string().optional(),
  panNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  tanNumber: z.string().optional(),
  address: z.string().optional(),
  pinCode: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  level: z.string().optional(),
  isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateOrg({ id }: UpdateOrgProps) {
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
      companyName: "",
      panNumber: "",
      gstNumber: "",
      tanNumber: "",
      address: "",
      pinCode: "",
      state: "",
      city: "",

      isActive: true,
    },
  });

  // ✅ Fetch registries
  useEffect(() => {
    const fetchRegistries = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const res = await axios.get(`${baseUrl}/business?type=REGISTRY`);
        setRegistries(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch registries:", err);
      }
    };
    fetchRegistries();
  }, []);

  // ✅ Fetch organization details
  useEffect(() => {
    const fetchOrg = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/business/${id}`,
        );
        const data = res?.data?.data ?? res?.data;

        form.reset({
          name: data?.name ?? "",
          code: data?.code ?? "",
          type: data?.type ?? "ORGANIZATION",
          registry: data?.parentId ?? "",
          parentId: data?.parentId ?? "",
          companyName: data?.companyName ?? "",
          panNumber: data?.panNumber ?? "",
          gstNumber: data?.gstNumber ?? "",
          tanNumber: data?.tanNumber ?? "",
          address: data?.address ?? "",
          pinCode: data?.pinCode ?? "",
          state: data?.state ?? "",
          city: data?.city ?? "",
          level: String(data?.level ?? "4"),
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
  }, [id, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

      await axios.patch(`${baseUrl}/business/${id}`, {
        ...values,
        parentId: values.registry || values.parentId || null,
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
    <div>
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

      <h1 className="mb-8 text-3xl font-extrabold text-gray-800">
        Update Organization
      </h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid for main fields */}
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
              { name: "companyName", label: "Company Name" },
              { name: "panNumber", label: "PAN Number" },
              { name: "gstNumber", label: "GST Number" },
              { name: "tanNumber", label: "TAN Number" },
              { name: "address", label: "Address" },
              { name: "pinCode", label: "PIN Code" },
              { name: "state", label: "State" },
              { name: "city", label: "City" },
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
                        value={field.value as string} // ✅ cast to string
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
              {saving ? "Saving..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border-gray-300 px-6 py-2 shadow-sm hover:bg-gray-50"
              onClick={() => router.push("/dashboard/org")}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
