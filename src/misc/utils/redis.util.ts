import { redisClient } from './../../loader/connection';

export function getRefreshTokenKey(userId: number): string {
  return `user:${userId}`;
}

// N일에 대한 Redis 만료 시간을 계산해서 반환해주는 함수
export function getExpTimeFromDay(day: number): number {
  return day * 24 * 60 * 60 * 1000;
}

// Redis command 함수를 제공하는 클래스
export class RedisCache {
  static async set(
    key: string,
    value: any,
    ttl?: number,
  ): Promise<string | null> {
    if (ttl) {
      return await redisClient.set(key, value, { EX: ttl });
    }

    return await redisClient.set(key, value);
  }
}
