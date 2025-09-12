// src/features/generator/lib/schemas.ts
import { z } from 'zod';

const chapterSchema = z.object({
    id: z.string(),
    title: z.string(),
});

const languageSchema = z.object({
    id: z.number(),
    code: z.string(),
});

export const bookGeneratorSchema = z.object({
  googleSheetUrl: z.url({ message: 'Please enter a valid Google Sheet URL.' }),
  cache_id: z.string(),
  selected_chapter_ids: z.array(chapterSchema).min(1, { message: 'Please select at least one chapter.' }),

  title: z.string().trim().min(1, { message: 'Book title is required.' }),
    selected_tone_id: z.number().int().refine(
      (val) => Number.isInteger(val),
      { message: 'Please select a writing tone.' }
    ),

  writer_intro: z.string().trim().min(1, { message: 'Writer introduction is required.' }),
  words_per_chapter: z.number().int().min(500, { message: 'Must be at least 500 words.' }).max(5000, { message: 'Cannot exceed 5,000 words.' }),
  languages: z.array(languageSchema).min(1, { message: 'Please select at least one language.' }),
  ai_prompt: z.string().trim().min(1, { message: 'AI prompt is required.' }),
});

// Types for form input
export type BookGeneratorFormValues = z.infer<typeof bookGeneratorSchema>;