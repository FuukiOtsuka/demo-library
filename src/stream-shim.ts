// src/stream-shim.ts
// NestJSのSSE機能が依存するストリームクラスをモックアップします。

// ダミーのReadableクラスを定義します。
export class Readable {
  // NestJSが呼び出す可能性があるメソッドを定義（空でOK）
  pipe() {}
  destroy() {}
  _read() {} // 抽象メソッドを定義
}

// Node.jsのstreamモジュールは一般的にクラスをエクスポートします
export const Writable = class {};
export const Duplex = class extends Readable {};
export const Transform = class extends Duplex {};
export const Stream = Readable; // NestJSが require('stream').Readable として使うかもしれないため
