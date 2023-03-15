import { getRedisTtlFromDay } from '../../misc/utils/redis.util';
import { Role } from '../domain/enum/role.vo';

export type JwtLoginPayload = {
  sub: number;

  iat: number;

  exp: number;

  role: Role;
};

export function generateAccessTokenPayload(sub: number, role: Role): JwtLoginPayload {
  return { sub, iat: new Date().getTime(), exp: getAccessTokenExpTime(), role };
}

export function generateRefreshTokenPayload(sub: number, role: Role): JwtLoginPayload {
  return { sub, iat: new Date().getTime(), exp: getRefreshTokenExpTime(), role };
}

function getAccessTokenExpTime(): number {
  const now = new Date().getTime();
  const expirationTime =
    Number(process.env.ACCESS_TOKEN_EXP_HOUR) * 60 * 60 * 1000;

  // 1시간 이후의 타임스탬프를 리턴
  return now + expirationTime;
}

function getRefreshTokenExpTime(): number {
  const now = new Date().getTime();
  const expirationTime = Number(process.env.REFRESH_TOKEN_EXP_DAY) * 24 * 60 * 60 * 1000;

  return now + expirationTime;
}
