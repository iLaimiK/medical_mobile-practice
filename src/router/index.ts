import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),  哈希模式
  // vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 '/'
  // https://vitejs.dev/guide/build.html#public-base-path
  // 如果将来你部署的域名路径是：http://xxx/my-path/user
  // vite.config.ts  添加配置  base: /my-path，路由这就会加上 my-path 前缀了
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

export default router;
