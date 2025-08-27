import type {ApiResponse} from "@/shared/types/api.ts";

export type User = {
    id: number;
    email: string;
}

export type UserInfoResponse = ApiResponse<User>;