import * as z from "zod";

export const registrySchema = z.object({
  name: z.string().min(3).max(32),
  type: z.string().min(3).max(32),
  isActive: z.boolean().optional(),
});
