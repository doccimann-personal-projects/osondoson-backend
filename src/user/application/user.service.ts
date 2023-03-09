import { RegisterRequest } from './dto/request/user.register.request';
export class UserService {
  // 회원가입
  async register(registerRequest: RegisterRequest): Promise<string> {
    return 'OK';
  }
}
