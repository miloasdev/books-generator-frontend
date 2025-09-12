// src/features/processing/components/ChapterStatusCard.tsx
import { cn } from "@/shared/lib/utils";
import { Check, Loader2, X } from "lucide-react";

type ChapterStatus = "pending" | "generating" | "done" | "failed";

interface ChapterStatusCardProps {
  title: string;
  status: ChapterStatus;
}

const statusConfig = {
  pending: { icon: null, text: "Pending", textColor: "text-muted-foreground" },
  generating: { icon: <Loader2 className="h-4 w-4 animate-spin" />, text: "Generating", textColor: "text-primary" },
  done: { icon: <Check className="h-4 w-4 text-green-600" />, text: "Done", textColor: "text-green-600" },
  failed: { icon: <X className="h-4 w-4 text-red-600" />, text: "Failed", textColor: "text-red-600" },
};

export const ChapterStatusCard = ({ title, status }: ChapterStatusCardProps) => {
  const { icon, text, textColor } = statusConfig[status];
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors">
      <span className="font-medium text-foreground">{title}</span>
      <div className={cn("flex items-center gap-2 text-sm", textColor)}>
        {icon}
        {text}
      </div>
    </div>
  );
};
