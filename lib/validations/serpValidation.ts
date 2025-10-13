import * as z from "zod";

export const serpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  type: z.enum(["SERP"]).optional(),
  parentId: z.string().nonempty("Please select a parent"),
  isActive: z.boolean().optional(),

  panNo: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), {
      message: "PAN number must be in format XXXXX9999X",
    }),

  tanNo: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(val), {
      message: "TAN number must be in format XXXX99999X",
    }),

    
  gstNo: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(val),
      { message: "GST number must be in format 99XXXXX9999X9X9X" }
    ),

  pincode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{6}$/.test(val), {
      message: "Pincode must be exactly 6 digits",
    }),

  address: z.string().max(250, "Address too long").optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});
