import { User } from './user.entity';
import { ExpressApp } from '../../app/app.express';
import { DataSource } from 'typeorm';

const dataSource: DataSource = ExpressApp.dataSource!;

export default dataSource.getRepository(User);
