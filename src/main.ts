import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  // platform-express アダプターを使用して Nest アプリケーションを作成
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  // 別のポート (例: 3001) で起動するように変更
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
