import * as z from "zod";

export const perpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  type: z.enum(["PERP", "SERP", "REGISTRY", "ORG", "CU"], {
    errorMap: () => ({
      message: "Type must be one of: PERP, SERP, REGISTRY, ORG, CU",
    }),
  }),

  isActive: z.boolean().optional(),

  panNo: z
    .string()
    // .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format (e.g. ABCDE1234F)")
    .optional(),

  tanNo: z
    .string()
    // .regex(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN format")
    .optional(),

  gstNo: z
    .string()
    // .regex(
    //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    //   "Invalid GST format"
    // )
    .optional(),

  address: z.string().max(250, "Address too long").optional(),

  pincode: z
    .string()
    // .regex(/^\d{6}$/, "Pincode must be 6 digits")
    .optional(),

  state: z.string().optional(),
  country: z.string().optional(),
});