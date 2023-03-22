import { Role } from "../../../domain/enum/role.vo";

export class UserRefreshRequest {
    userId: number;

    role: Role;

    refreshToken: string;

    static of(userId: number, role: Role, refreshToken: string): UserRefreshRequest {
        const request = new UserRefreshRequest();

        request.userId = userId;
        request.role = role;
        request.refreshToken = refreshToken;

        return request;
    }
}