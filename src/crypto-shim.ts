// src/crypto-shim.ts
// Dynamic require of "crypto"を抑制し、NestJSのキー生成を無害化するために使用されます

// UUIDを生成する代わりに、固定のダミー値を返すか、よりシンプルな乱数生成を使用します。
export const randomUUID = () => '00000000-0000-4000-8000-000000000000';
export const randomBytes = (size: number) => new Uint8Array(size);
