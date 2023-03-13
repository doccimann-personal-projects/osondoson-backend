import { UserController } from './../../user/presentation/user.controller';
import { UserService } from './../../user/application/user.service';
import { UserRepository } from '../../user/domain/user.repository';
import { Container } from 'inversify';
import { Types } from './types.di';

const container = new Container();

container.bind<UserRepository>(Types.USER_REPOSITORY).to(UserRepository).inSingletonScope();
container.bind<UserService>(Types.USER_SERVICE).to(UserService).inSingletonScope();
container.bind<UserController>(Types.USER_CONTROLLER).to(UserController).inSingletonScope();

export default container;