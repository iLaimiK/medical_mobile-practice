import router from "@/router";
import { useUserStore } from "@/stores/modules/user";
import axios, { type AxiosError, type AxiosResponse, type Method } from "axios";
import { showToast } from "vant";

const request = axios.create({
  baseURL: "https://consult-api.itheima.net/",
  timeout: 10000,
});

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
    return Promise.reject(new Error(err.response?.statusText ?? "网络异常"));
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
      showToast("登录过期，请重新登录");
      // 清除用户信息
      useUserStore().logoutUser();
      // 跳转登录页
      router.push({
        path: "/login",
        query: { returnUrl: router.currentRoute.value.fullPath },
      });
    }
    return Promise.reject(new Error(err.response?.statusText ?? "网络异常"));
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
