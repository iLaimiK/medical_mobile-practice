import router from "@/router";
import { refreshTokenAPI } from "@/services/user";
import { useUserStore } from "@/stores/modules/user";
import axios, { type AxiosError, type AxiosResponse, type Method } from "axios";
import { showToast } from "vant";

const request = axios.create({
  baseURL: "https://consult-api.itheima.net/",
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<() => Promise<unknown>> = [];

request.interceptors.request.use(
  (config) => {
    // 添加 token
    const store = useUserStore();
    if (store.user?.token && config.headers) {
      config.headers["Authorization"] = `Bearer ${store.user?.token}`;
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res: AxiosResponse) => {
    // 统一处理错误
    if (res.data?.code !== 10000) {
      showToast(res.data?.message || "请求失败");
      return Promise.reject(new Error(res.data?.message));
    }
    return res.data;
  },
  (err: AxiosError) => {
    // 401 token 失效
    if (err.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        // 更新 token
        refreshTokenAPI(useUserStore().user?.refreshToken ?? "")
          .then((res) => {
            useUserStore().loginUser(res.data);
            failedQueue.forEach((fn) => (fn as () => Promise<unknown>)());
            failedQueue = [];
          })
          .catch((err) => {
            console.error("刷新 Token 失败:", err);
            showToast("登录过期，请重新登录");
            failedQueue = [];
            // 清除用户信息
            useUserStore().logoutUser();
            // 跳转登录页
            router.push({
              path: "/login",
              query: { returnUrl: router.currentRoute.value.fullPath },
            });
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        failedQueue.push(() => {
          const retryConfig = { ...err.response?.config };
          retryConfig.headers!["Authorization"] =
            `Bearer ${useUserStore().user?.token}`;
          return request(retryConfig);
        });
      }
    }
    return Promise.reject(err);
  },
);

export default request;

export const baseURL = request.defaults.baseURL;

type Data<T> = {
  code: number;
  message: string;
  data: T;
};

export const req = <T>(url: string, method: Method = "get", data?: object) => {
  return request.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
  });
};
