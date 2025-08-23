// src/features/dashboard/pages/DashboardPage.tsx
import { Book, FolderKanban, Globe, BarChart } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { RecentProjects } from '../components/RecentProjects';
import { QuickActions } from '../components/QuickActions';
import { UsageStats } from '../components/UsageStats';

export const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    An overview of your projects and usage statistics.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Books"
                    value="12"
                    description="+2 from last month"
                    icon={<Book className="h-5 w-5" />}
                />
                <StatCard
                    title="Projects"
                    value="4"
                    description="1 active project"
                    icon={<FolderKanban className="h-5 w-5" />}
                />
                <StatCard
                    title="Languages"
                    value="6"
                    description="English, Chinese, Hindi..."
                    icon={<Globe className="h-5 w-5" />}
                />
                <StatCard
                    title="Total Words"
                    value="180K"
                    description="~45k words per project"
                    icon={<BarChart className="h-5 w-5" />}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentProjects />
                </div>
                <div className="space-y-6">
                    <QuickActions />
                    <UsageStats />
                </div>
            </div>
        </div>
    );
};
