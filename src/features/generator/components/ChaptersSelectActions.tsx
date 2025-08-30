import {Button} from "@/shared/components/ui/button.tsx";
import {Zap} from "lucide-react";

const ChaptersSelectActions = ({ allChapters, onSelect }: { allChapters: {id: string, title: string}[], onSelect: (selection: {id: string, title: string}[]) => void }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters)}>Select All</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => onSelect([])}>Deselect All</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters.filter((_, i) => (i + 1) % 2 !== 0))}>Select Odd</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => onSelect(allChapters.filter((_, i) => (i + 1) % 2 === 0))}>Select Even</Button>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                    const randomSelection = allChapters.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * allChapters.length) + 1);
                    onSelect(randomSelection);
                }}
            >
                <Zap className="mr-2 h-4 w-4" />
                Random
            </Button>
        </div>
    );
}

export default ChaptersSelectActions