import { getExpTimeFromDay } from '../../misc/utils/redis.util';

export type JwtLoginPayload = {
  sub: number;

  iat: number;

  exp: number;
};

export function generateAccessTokenPayload(sub: number): JwtLoginPayload {
  return { sub, iat: new Date().getTime(), exp: getAccessTokenExpTime() };
}

export function generateRefreshTokenPayload(sub: number): JwtLoginPayload {
  return { sub, iat: new Date().getTime(), exp: getRefreshTokenExpTime() };
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
  const expirationTime = getExpTimeFromDay(
    Number(process.env.REFRESH_TOKEN_EXP_DAY),
  );

  return now + expirationTime;
}
