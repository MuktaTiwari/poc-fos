import * as z from "zod";

export const adminSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  emailId: z.string().min(1, { message: "email Id is required" }),
  adminType: z.string().min(1, { message: "Admin type is required" }),
  assignRole: z.string().min(1, { message: "Assign role is required" }),
  status: z.boolean().optional().nullable(),
  phoneNo: z.string().optional().nullable(),
  passwordSetup: z.string().optional().nullable(),
});