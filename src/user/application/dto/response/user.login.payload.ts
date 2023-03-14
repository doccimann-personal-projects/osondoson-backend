export class JwtLoginPayload {
  sub: number;

  iat: Date;

  exp: Date;

  constructor(sub: number, iat: Date, exp: Date) {
    this.sub = sub;
    this.iat = iat;
    this.exp = exp;
  }

  // 액세스 토큰의 payload를 생성하는 메소드
  static generateAccessTokenPayload(sub: number): JwtLoginPayload {
    return new JwtLoginPayload(
      sub,
      new Date(),
      JwtLoginPayload.getAccessTokenExpTime(),
    );
  }

  static generateRefreshTokenPayload(sub: number): JwtLoginPayload {
    return new JwtLoginPayload(
      sub,
      new Date(),
      JwtLoginPayload.getRefreshTokenExpTime(),
    );
  }

  // 액세스 토큰의 만료 시간을 계산하는 메소드
  private static getAccessTokenExpTime(): Date {
    const now = new Date().getTime();
    const expirationTime =
      Number(process.env.ACCESS_TOKEN_EXP_HOUR) * 60 * 60 * 1000;

    // 1시간 이후의 타임스탬프를 리턴
    return new Date(now + expirationTime);
  }

  // 리프레시 토큰의 만료 시간을 계산하는 메소드
  private static getRefreshTokenExpTime(): Date {
    const now = new Date().getTime();
    const expirationTime =
      Number(process.env.REFRESH_TOKEN_EXP_DAY) * 24 * 60 * 60 * 1000;

    return new Date(now + expirationTime);
  }
}
