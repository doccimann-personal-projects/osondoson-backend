import { Express } from 'express';

export interface HttpApp {
  start: () => any;
  stop: () => any;
  isShuttingDown: boolean;
  _app: Express;
}