import { Router } from 'express';
import { responseMiddleware } from '../../misc/utils/response.util';
import { researchController } from '../presentation/research.controller';
const researchRouter: Router = Router();

// 리서치 데이터1
// 삽입(수동으로 한 번만)
researchRouter.post(
  '/1',
  researchController.insertResearch1,
  responseMiddleware,
);
// 불러오기
researchRouter.get(
  '/1',
  researchController.getAllResearch1,
  responseMiddleware,
);

export default researchRouter;
