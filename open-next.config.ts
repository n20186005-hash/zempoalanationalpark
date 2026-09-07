import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  // OpenNext 内部构建 Next.js 时默认执行 `npm run build`，会导致外层
  // `npm run build`(即 opennextjs-cloudflare build) 被再次触发形成递归。
  // 显式指定底层命令为 `next build`，保证 CI 链条：
  //   npm run build -> opennextjs-cloudflare build -> next build -> .open-next
  buildCommand: 'next build',
};

export default config;
