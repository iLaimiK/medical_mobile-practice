import { createRouter, createWebHistory } from "vue-router";
// 引入进度条插件
import { useUserStore } from "@/stores/modules/user";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home/index.vue"),
        meta: { title: "首页" },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/User/index.vue"),
        meta: { title: "个人中心" },
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/views/Article/index.vue"),
        meta: { title: "健康百科" },
      },
      {
        path: "/notify",
        name: "notify",
        component: () => import("@/views/Notify/index.vue"),
        meta: { title: "消息通知" },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/login/callback",
    component: () => import("@/views/Login/LoginCallback.vue"),
    meta: { title: "第三方登录-绑定手机" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register/index.vue"),
  },
];

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),  哈希模式
  // vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 '/'
  // https://vitejs.dev/guide/build.html#public-base-path
  // 如果将来你部署的域名路径是：http://xxx/my-path/user
  // vite.config.ts  添加配置  base: /my-path，路由这就会加上 my-path 前缀了
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// 修改进度条插件配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: "body", //指定进度条的父容器
});

// 前置守卫 访问权限控制
router.beforeEach((to) => {
  // 开启页面进度条
  NProgress.start();
  // 用户仓库
  const userStore = useUserStore();
  // 白名单
  const whiteList = ["/login", "/register", "/login/callback"];
  // 判断是否在白名单内
  if (!userStore.user?.token && !whiteList.includes(to.path)) {
    return "/login";
  }
});

// 后置守卫
router.afterEach((to) => {
  // 页面标题
  document.title = to.meta.title || "医健";
  // 关闭页面进度条
  NProgress.done();
});

export default router;
