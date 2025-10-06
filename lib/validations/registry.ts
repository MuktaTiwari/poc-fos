import * as z from "zod";

export const registrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  parentId: z.string().min(1, { message: "Parent is required" }),
  isActive: z.boolean().optional(),
  panNo: z.string().optional().nullable(),
  tanNo: z.string().optional().nullable(),
  gstNo: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  pincode: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});
