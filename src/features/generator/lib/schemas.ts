// src/features/generator/lib/schemas.ts
import { z } from 'zod';

const languageSchema = z.object({
    id: z.string(),
    label: z.string(),
});

const chapterSchema = z.object({
    id: z.string(),
    title: z.string(),
});

// Define the input schema (what the form receives)
export const bookGeneratorInputSchema = z.object({
    googleSheetUrl: z.url({ message: 'Please enter a valid Google Sheet URL.' }),
    selectedChapters: z.array(chapterSchema).min(1, { message: 'Please select at least one chapter.' }),
    writerIntroduction: z.string(),
    wordsPerChapter: z.string().min(1, { message: 'This field is required.' }),
    languages: z.array(languageSchema).min(1, { message: 'Please select at least one language.' }),
    enhancementPrompt: z.string().optional(),
});

// Define the output schema (what you get after transformation)
export const bookGeneratorSchema = bookGeneratorInputSchema.transform((data) => ({
    ...data,
    wordsPerChapter: Number(data.wordsPerChapter),
})).refine((data) => data.wordsPerChapter >= 500, {
    message: 'Must be at least 500 words.',
    path: ['wordsPerChapter'],
}).refine((data) => data.wordsPerChapter <= 10000, {
    message: 'Cannot exceed 10,000 words.',
    path: ['wordsPerChapter'],
});

// Types for form input
export type BookGeneratorFormValues = z.infer<typeof bookGeneratorInputSchema>;