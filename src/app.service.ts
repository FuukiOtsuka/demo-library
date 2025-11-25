// src/app.service.ts の内容（想定）

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // メソッド名は getHello ではなく getData になっている
  getData(): { message: string } {
    return {
      message: 'Hello from NestJS Service running on Cloudflare Worker!',
    };
  }
}
