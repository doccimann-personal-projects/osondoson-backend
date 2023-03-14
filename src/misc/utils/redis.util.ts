export function getRefreshTokenKey(userId: number): string {
    return `user:${userId}`;
}