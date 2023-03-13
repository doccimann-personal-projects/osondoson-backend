import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { RegisterRequest } from './dto/request/user.register.request';
import * as bcrypt from 'bcrypt';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // 회원가입
  async signUp(registerRequest: RegisterRequest): Promise<string> {
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const registerUser = registerRequest.toUserEntity();

    const savedUser: User = await this.userRepository.save(registerUser);

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
}
