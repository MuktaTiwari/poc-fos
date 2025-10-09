import * as z from "zod";

export const adminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roles: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  createdBy: z.string().min(1, "Created By is required"),
  createdOn: z.string().min(1, "Created On is required"),
  lastActivity: z.string().min(1, "Last Activity is required"),
});