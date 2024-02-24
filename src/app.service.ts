import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping() {
    return {
      health: 'ok',
      status: 200,
      docs: 'http://localhost:8848/docs',
    };
  }
}
