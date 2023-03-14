import { UserController } from './../../user/presentation/user.controller';
import { UserService } from './../../user/application/user.service';
import { UserRepository } from '../../user/domain/user.repository';
import { BoardController } from '../../community/boards/presentation/board.controller';
import { BoardService } from '../../community/boards/application/board.service';
import { BoardRepository } from '../../community/boards/domain/board.repository';
import { Container } from 'inversify';
import { Types } from './types.di';

const container = new Container();

container
  .bind<UserRepository>(Types.USER_REPOSITORY)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<UserService>(Types.USER_SERVICE)
  .to(UserService)
  .inSingletonScope();
container
  .bind<UserController>(Types.USER_CONTROLLER)
  .to(UserController)
  .inSingletonScope();

container
  .bind<BoardRepository>(Types.BOARD_REPOSITORY)
  .to(BoardRepository)
  .inSingletonScope();
container
  .bind<BoardService>(Types.BOARD_SERVICE)
  .to(BoardService)
  .inSingletonScope();
container
  .bind<BoardController>(Types.BOARD_CONTROLLER)
  .to(BoardController)
  .inSingletonScope();
export default container;
