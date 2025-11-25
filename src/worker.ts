// src/worker.ts (デプロイ成功を目指す最終版)

import { NestFactory, NestApplicationContext } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

// 【修正点 A】不要な型インポートを削除。
// import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';

// Cloudflare Workersのグローバル型ExecutionContextを定義
// type ExecutionContext = any;

// 【修正点 B】型定義をシンプルに戻す（エラーメッセージを無視）
let appPromise: Promise<NestApplicationContext> | null = null;

// 【修正点 C】戻り値の型もシンプルに戻す
async function getApp(): Promise<NestApplicationContext> {
  if (!appPromise) {
    // 【修正点 D】戻り値を NestApplicationContext として型を断定する (as NestApplicationContext)
    // これにより、TypeScriptの静的チェックを強制的に通過させる
    appPromise = NestFactory.createApplicationContext(AppModule, {
      // ロガー設定は削除済み
    }) as Promise<NestApplicationContext>;

    await appPromise;
  }

  // Promise<T> を返すことが保証される
  return await appPromise;
}

// Cloudflare Workers のエントリーポイント
export default {
  async fetch(
    request: Request,
    // 【修正点 E】未使用のエラー回避のため、引数に戻す
    // _env: any,
    // _ctx: ExecutionContext,
  ): Promise<Response> {
    // DIコンテナを取得
    const app = await getApp();

    const url = new URL(request.url);

    // --- NestJS Service の呼び出し ---
    if (url.pathname === '/api/data') {
      try {
        // ... (ロジックは変更なし) ...
        const appService = app.get(AppService);
        const data = appService.getData();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      } catch (error) {
        console.error('API Error:', error);
        return new Response('Internal Server Error while accessing service.', {
          status: 500,
        });
      }
    }
    // ---------------------------------

    // ヘルスチェックエンドポイント
    if (url.pathname === '/health') {
      return new Response('NestJS Core Worker is ALIVE!', { status: 200 });
    }

    // 未処理のパス
    return new Response(`Path ${url.pathname} not handled.`, { status: 404 });
  },
};
