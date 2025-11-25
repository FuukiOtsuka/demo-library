// src/os-shim.ts
// Dynamic require of "os"を抑制するために使用されます
export const platform = () => 'cf-workers';
export const EOL = '\n';
export const cpus = () => [];
export const totalmem = () => 0;
export const freemem = () => 0;
export const homedir = () => '/';
export const networkInterfaces = () => ({});
export const userInfo = () => ({ username: 'cloudflare' });
