import {api} from "@/shared/services/api.ts";
import type {UserInfoResponse} from "@/shared/types/user.ts";

export const userService = {
    get_user: () => {
        return api.get<UserInfoResponse>('/user/me')
    }
}