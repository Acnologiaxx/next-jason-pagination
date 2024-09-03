import { z } from "zod";

export const UserSchema = z.object({
  id: z.union([z.string().uuid(), z.number()]),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  avatar: z.string().url(),
});

export type User = z.infer<typeof UserSchema>;
