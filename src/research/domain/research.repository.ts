import { Research1 } from './research.entity';
import fs from 'fs';
import path from 'path';

export class ResearchRepository {
  async insertResearch1(): Promise<string> {
    const research1JSON = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../', 'data.json'), 'utf-8'),
    );
    await Research1.create(research1JSON);

    return 'Ok';
  }
  async findAllResearch1(): Promise<object> {
    const research1 = await Research1.find({});

    return research1;
  }
}

const researchRepository = new ResearchRepository();
export { researchRepository };
