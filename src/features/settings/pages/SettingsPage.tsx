// src/features/settings/pages/SettingsPage.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/shared/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';
import { Button } from '@/shared/components/ui/button';
import { SettingsCard } from '../components/SettingsCard';
import { settingsSchema, type SettingsFormValues } from '../lib/schemas';

export const SettingsPage = () => {
    const { toast } = useToast();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            fullName: 'Muhaiman',
            email: 'muhaiman@example.com',
            defaultWordsPerChapter: 2500,
            defaultEnhancementPrompt: 'Please enhance the content to be more engaging and professional.',
            enhancementLevel: 'moderate',
            translationQuality: 'high',
            autoGenerateTitles: true,
            includeToc: true,
            addChapterSummaries: false,
            emailNotifications: true,
            weeklySummary: false,
        },
    });

    function onSubmit(data: SettingsFormValues) {
        console.log(data);
        toast({
            title: 'Settings Saved',
            description: 'Your preferences have been updated successfully.',
        });
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and generation preferences.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <SettingsCard title="Account Settings">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl><Input type="email" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Default Generation Settings">
                        <FormField
                            control={form.control}
                            name="defaultWordsPerChapter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Words per Chapter</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultEnhancementPrompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Enhancement Prompt</FormLabel>
                                    <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </SettingsCard>

                    <SettingsCard title="AI Configuration">
                        <FormField
                            control={form.control}
                            name="enhancementLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content Enhancement Level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="light">Light Enhancement</SelectItem>
                                            <SelectItem value="moderate">Moderate Enhancement</SelectItem>
                                            <SelectItem value="heavy">Heavy Enhancement</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="translationQuality"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Translation Quality</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard</SelectItem>
                                            <SelectItem value="high">High Quality</SelectItem>
                                            <SelectItem value="premium">Premium</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <FormField
                                control={form.control} name="autoGenerateTitles"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <FormLabel>Auto-generate book titles</FormLabel>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control} name="includeToc"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <FormLabel>Include table of contents</FormLabel>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control} name="addChapterSummaries"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <FormLabel>Add chapter summaries</FormLabel>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Notifications">
                        <FormField
                            control={form.control} name="emailNotifications"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel>Email Notifications</FormLabel>
                                        <FormDescription>Receive updates when your books are ready.</FormDescription>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} name="weeklySummary"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <FormLabel>Weekly Summary</FormLabel>
                                        <FormDescription>Get a report of your weekly activity.</FormDescription>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                    </SettingsCard>

                    <div className="flex justify-end">
                        <Button type="submit">Save Settings</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};