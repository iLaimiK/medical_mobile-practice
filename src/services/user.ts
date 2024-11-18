import type { CodeType, User, UserId, UserInfo } from "@/types/user";
import { req } from "@/utils/request";

// 刷新token
export const refreshTokenAPI = (refreshToken: string) => {
  return req<User>("/login/refreshToken", "post", {
    grantType: "refreshToken",
    refreshToken,
  });
};

// 注册
export const registerAPI = (mobile: string, code: string, password: string) => {
  return req<UserId>("/register", "post", { mobile, code, password });
};

// 密码登录api
export const loginByPwdAPI = (mobile: string, password: string) => {
  return req<User>("/login/password", "post", { mobile, password });
};

// 获取验证码api
export const sendCodeAPI = (mobile: string, type: CodeType) => {
  return req("/code", "get", { mobile, type });
};

// 短信登录api
export const loginByCodeAPI = (mobile: string, code: string) => {
  return req<User>("/login", "post", { mobile, code });
};

// QQ登录api
export const loginByQQAPI = (openId: string) => {
  return req<User>("/login/thirdparty", "post", {
    openId,
    source: "qq",
  });
};

// 绑定手机api
export const bindMobileAPI = (mobile: string, code: string, openId: string) => {
  return req<User>("/login/binding", "post", { mobile, code, openId });
};

// 获取用户信息api
export const getUserInfoAPI = () => req<UserInfo>("/patient/myUser");
