// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
// import { AppController } from './app.controller'; // 削除

@Module({
  imports: [],
  // controllers: [AppController], // 削除
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
