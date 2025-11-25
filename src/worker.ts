// src/worker.ts

import { INestApplicationContext } from '@nestjs/common';
import { AppModule } from './app.module';

// WorkersのExecutionContextはグローバル型（@cloudflare/workers-typesが必要）
// INestApplicationContextを@nestjs/coreからインポート
import { NestFactory } from '@nestjs/core';
import { AppService } from './app.service';

// アプリケーションインスタンスをキャッシュするための変数
// INestApplicationContextを使用
let appPromise: Promise<INestApplicationContext> | null = null;

async function getApp(): Promise<INestApplicationContext> {
  if (!appPromise) {
    // 【修正箇所】loggerオプションを完全に削除するか、シンプルにする
    appPromise = NestFactory.createApplicationContext(AppModule, {
      // logger: ['error', 'warn'],  <-- この行を削除/コメントアウト
      // NestJSのロガーも内部でNode.jsのutilやperf_hooksなどに依存するため
    });
    await appPromise;
  }
  return appPromise;
}

// Cloudflare Workers のエントリーポイント
// Cloudflare Workers のエントリーポイント
export default {
  async fetch(
    request: Request,
    // _env: any,
    // _ctx: ExecutionContext,
  ): Promise<Response> {
    // DIコンテナを取得
    const app = await getApp();

    const url = new URL(request.url);

    // --- 【修正箇所】アダプターロジックの実装 ---
    if (url.pathname === '/api/data') {
      try {
        // DIコンテナから AppService を取得
        const appService = app.get(AppService);

        // サービスメソッドを呼び出し
        const data = appService.getData();

        // 結果をJSON形式のResponseとして返す
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      } catch (error) {
        console.error(error);
        return new Response('Internal Server Error while accessing service.', {
          status: 500,
        });
      }
    }
    // ------------------------------------------

    if (url.pathname === '/health') {
      return new Response('NestJS Core Worker is ALIVE!', { status: 200 });
    }

    return new Response(`Path ${url.pathname} not handled.`, { status: 404 });
  },
};
