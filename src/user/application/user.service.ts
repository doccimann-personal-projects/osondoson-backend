import { setAsyncToRedis } from './../../loader/connection';
import { JwtLoginPayload } from './dto/response/user.login.payload';
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
import { getRefreshTokenKey } from '../../misc/utils/redis.util';

@injectable()
export class UserService {
  constructor(
    @inject(Types.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  // 회원가입
  async signUp(registerRequest: RegisterRequest): Promise<string> {
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const registerUser = registerRequest.toUserEntity();

    const savedUser = await this.userRepository.save(registerUser);

    return 'OK';
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

  // 유저 로그인
  async login(loginRequest: UserLoginRequest): Promise<UserLoginResponse> {
    const { email, password } = loginRequest;

    // 이메일, 패스워드 검증 이후에 userId를 취득해온다
    const userId = await this.verifyLoginRequest(email, password);

    // payload 생성
    const accessTokenPayload = JwtLoginPayload.generateAccessTokenPayload(userId);
    const refreshTokenPayload = JwtLoginPayload.generateRefreshTokenPayload(userId);

    // accessToken, refreshToken 생성
    const accessToken = this.generateAccessToken(accessTokenPayload);
    const refreshToken = this.generateRefreshToken(refreshTokenPayload);

    // redis에 refreshToken 보관
    await this.cacheRefreshToken(userId, refreshToken);

    return new UserLoginResponse(accessToken, refreshToken);
  }

  // 토큰을 생성하는 메소드
  private generateAccessToken(payload: JwtLoginPayload): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
  }

  private generateRefreshToken(payload: JwtLoginPayload): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!)
  }

  // Redis에 refreshToken을 보관하는 메소드
  private async cacheRefreshToken(userId: number, token: string): Promise<void> {
    const key = getRefreshTokenKey(userId);
    return await setAsyncToRedis(key, token);
  }

  // 유저를 검증하고, 올바른 요청이면 유저의 id를 반환해주는 메소드
  private async verifyLoginRequest(
    email: string,
    password: string,
  ): Promise<number> {
    // 해당 이메일이 존재하는가?
    const targetUser = await this.userRepository.findOneByEmail(email);

    if (!targetUser) {
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

    return targetUser.id;
  }
}
