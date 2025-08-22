// src/features/settings/lib/schemas.ts
import { z } from 'zod';

export const settingsSchema = z.object({
    fullName: z.string().min(1, 'Full name is required.'),
    email: z.email('Please enter a valid email.'),
    defaultWordsPerChapter: z.number().min(500).max(10000),
    defaultEnhancementPrompt: z.string().optional(),
    enhancementLevel: z.string(),
    translationQuality: z.string(),
    autoGenerateTitles: z.boolean(),
    includeToc: z.boolean(),
    addChapterSummaries: z.boolean(),
    emailNotifications: z.boolean(),
    weeklySummary: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;