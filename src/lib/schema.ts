// lib/schema.ts
import { z } from 'zod';

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  description: z.string(),
  category: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof postSchema>;
