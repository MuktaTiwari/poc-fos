"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { DashboardHeader } from "@/components/dashboard/header";

// ✅ Zod schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  type: z.string().nonempty("Type is required"),
  registry: z.string().nonempty("Registry is required"),
  parentId: z.string().optional(),
  companyName: z.string().optional(),
  panNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  tanNumber: z.string().optional(),
  address: z.string().optional(),
  pinCode: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewOrg() {
  const router = useRouter();
  const [registries, setRegistries] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

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
    },
  });

  // Fetch registries
  useEffect(() => {
    const fetchRegistries = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        const response = await axios.get(`${baseUrl}/business?type=REGISTRY`);
        setRegistries(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch registries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistries();
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      await axios.post(`${baseUrl}/business`, {
        ...values,
        parentId: values.registry, // ✅ backend expects registry id as parentId
      });
      router.push("/dashboard/org");
    } catch (error) {
      console.error("Error saving the data:", error);
    }
  };

  return (
    <div>
      <DashboardHeader
        heading="Add Org form"
        text="Access only for users with ADMIN role."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Name */}
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

            {/* Type */}
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
                    disabled={loading || registries.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={loading ? "Loading..." : "Select registry"}
                      />
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

          {/* Additional Fields */}
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap justify-end gap-4">
            <Button type="submit" className="rounded-lg px-6 py-2 shadow-md">
              Create
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
