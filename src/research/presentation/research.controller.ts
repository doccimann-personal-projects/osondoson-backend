import express from 'express';
import { researchRepository } from '../domain/research.repository';

class ResearchController {
  async insertResearch1(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await researchRepository.insertResearch1();
      res.locals.data = result;
    } catch {
      next();
    }
  }
  async getAllResearch1(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const result = await researchRepository.findAllResearch1();
      res.locals.data = result;
    } catch {
      next();
    }
  }
}

const researchController = new ResearchController();
export { researchController };
