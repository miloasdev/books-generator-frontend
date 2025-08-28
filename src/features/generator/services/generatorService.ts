import {api} from "@/shared/services/api.ts";
import type {SheetChapterResponse} from "@/shared/types/generator.ts";

export const generatorService = {
    connectToSheets: (url: string) => {
        return api.post<SheetChapterResponse>('/sheet/connect', {"sheet_url": url});
    }
}