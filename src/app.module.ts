// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
// import { AppController } from './app.controller'; // 削除
import { BookListModule } from './book-list/book-list.module';

@Module({
  imports: [BookListModule],
  // controllers: [AppController], // 削除
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
