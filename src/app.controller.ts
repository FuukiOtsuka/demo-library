// // src/app.controller.ts

// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// // src/app.controller.ts の修正後のコード（想定）

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   // 【修正箇所】戻り値の型をオブジェクト型（または any）に変更
//   getHello(): { message: string } {
//     // AppServiceのgetData()は { message: string } を返す
//     return this.appService.getData();
//   }
// }
