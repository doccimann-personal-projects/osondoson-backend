import { RedisCache } from './../../misc/utils/redis.util';
import { JwtLoginPayload } from './../common/auth.utils';
import { commonErrors } from './../../misc/error/error.common';
import { AppError } from './../../misc/error/error.app';
import { UserLoginResponse } from './dto/response/user.login.response';
import { UserLoginRequest } from './dto/request/user.login.request';
import { inject, injectable } from 'inversify';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { RegisterRequest } from './dto/request/user.register.request';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Types } from '../../app/container/types.di';
import {
  getRedisTtlFromDay,
  getRefreshTokenKey,
} from '../../misc/utils/redis.util';
import {
  generateAccessTokenPayload,
  generateRefreshTokenPayload,
} from '../common/auth.utils';
import { UserRefreshResponse } from './dto/response/user.refresh.response';
import { UserRefreshRequest } from './dto/request/user.refresh.request';

@injectable()
export class UserService {
  constructor(
    @inject(Types.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  // Redis cache 보존 기간
  private readonly ttl: number = getRedisTtlFromDay(
    Number(process.env.REFRESH_TOKEN_EXP_DAY),
  );

  // 회원가입
  async signUp(registerRequest: RegisterRequest): Promise<string> {
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const registerUser = registerRequest.toUserEntity();

    const savedUser = await this.userRepository.save(registerUser);

    return 'OK';
  }

  // 유저 로그인
  async login(loginRequest: UserLoginRequest): Promise<UserLoginResponse> {
    const { email, password } = loginRequest;

    // 이메일, 패스워드 검증 이후에 userId, role을 취득해온다
    const { id, role } = await this.verifyLoginRequest(email, password);

    // payload 생성
    const accessTokenPayload = generateAccessTokenPayload(id, role);
    const refreshTokenPayload = generateRefreshTokenPayload(id, role);

    // accessToken, refreshToken 생성
    const accessToken = this.generateAccessToken(accessTokenPayload);
    const refreshToken = this.generateRefreshToken(refreshTokenPayload);

    // redis에 refreshToken 보관
    await this.cacheRefreshToken(id, refreshToken);

    return new UserLoginResponse(accessToken, refreshToken);
  }

  // 리프레시 토큰이 올바른지 검증하고 액세스 토큰을 새로 반환해주는 메소드
  async issueNewAccessTokenByRefreshToken(userRefreshRequest: UserRefreshRequest): Promise<UserRefreshResponse> {
    const { userId, role, refreshToken } = userRefreshRequest;

    // userId를 이용해서 redis에 저장된 리프레시 토큰을 가져온다
    const refreshTokenFromCache = await this.getRefreshToken(userId);

    if (!refreshTokenFromCache) {
      throw new AppError(commonErrors.AUTHENTICATION_ERROR, 401, '토큰이 만료되었습니다');
    }

    // refreshToken 동일성 비교
    if (refreshTokenFromCache !== refreshToken) {
      throw new AppError(commonErrors.AUTHENTICATION_ERROR, 401, '올바르지 않은 토큰입니다');
    }

    // 액세스 토큰 재발급
    const accessTokenPayload = generateAccessTokenPayload(userId, role);
    const accessToken = this.generateAccessToken(accessTokenPayload);

    return new UserRefreshResponse(accessToken);
  }

  // 이미 존재하는 이메일을 지닌 유저가 있는가?
  async isAlreadyExistEmail(email: string): Promise<boolean> {
    const foundUser: User | null = await this.userRepository.findOneByEmail(
      email,
    );

    return foundUser ? true : false;
  }

  // 해당 닉네임이 이미 존재하는가?
  async isAlreadyExistNickname(nickname: string): Promise<boolean> {
    const foundUser: User | null = await this.userRepository.findOneByNickname(
      nickname,
    );

    return foundUser ? true : false;
  }

  // 토큰을 생성하는 메소드
  private generateAccessToken(payload: JwtLoginPayload): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
  }

  private generateRefreshToken(payload: JwtLoginPayload): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
  }

  // Redis에 refreshToken을 보관하는 메소드
  private async cacheRefreshToken(
    userId: number,
    token: string,
  ): Promise<string | null> {
    const key = getRefreshTokenKey(userId);

    return await RedisCache.set(key, token, this.ttl);
  }

  // Redis로부터 refreshToken을 가져오는 메소드
  private async getRefreshToken(userId: number): Promise<string | null> {
    const key = getRefreshTokenKey(userId);

    return await RedisCache.get(key);
  }

  // 유저를 검증하고, 올바른 요청이면 유저 엔티티를 반횐해주는 메소드
  private async verifyLoginRequest(
    email: string,
    password: string,
  ): Promise<User> {
    // 해당 이메일이 존재하는가?
    const targetUser = await this.userRepository.findOneByEmail(email);

    if (!targetUser || targetUser.isDeleted) {
      throw new AppError(
        commonErrors.AUTHENTICATION_ERROR,
        401,
        '이메일 혹은 패스워드를 다시 확인해주십시오.',
      );
    }

    // 패스워드 체크
    const isCorrectPassword = await bcrypt.compare(
      password,
      targetUser.password,
    );

    if (!isCorrectPassword) {
      throw new AppError(
        commonErrors.AUTHENTICATION_ERROR,
        401,
        '이메일 혹은 패스워드를 다시 확인해주십시오.',
      );
    }

    return targetUser;
  }
}
