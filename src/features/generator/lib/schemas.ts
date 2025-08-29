// src/features/generator/lib/schemas.ts
import { z } from 'zod';

const languageSchema = z.object({
    id: z.number(),
    label: z.string(),
});

const chapterSchema = z.object({
    id: z.string(),
    title: z.string(),
});

// Define the input schema (what the form receives)
export const bookGeneratorSchema = z.object({
    googleSheetUrl: z.string().url({ message: 'Please enter a valid Google Sheet URL.' }),
    selectedChapters: z.array(chapterSchema).min(1, { message: 'Please select at least one chapter.' }),
    writerIntroduction: z.string().trim().min(1, { message: 'Writer introduction is required.' }),
    wordsPerChapter: z.number().int().min(500, { message: 'Must be at least 500 words.' }).max(5000, { message: 'Cannot exceed 5,000 words.' }),
    languages: z.array(languageSchema).min(1, { message: 'Please select at least one language.' }),
    enhancementPrompt: z.string().trim().min(1, { message: 'AI prompt is required.' }),
});

// Types for form input
export type BookGeneratorFormValues = z.infer<typeof bookGeneratorSchema>;