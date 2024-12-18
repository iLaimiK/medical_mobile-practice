import type {
    CodeType,
    PatientInfo,
    PatientList,
    User,
    UserId,
    UserInfo,
} from "@/types/user";
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

// 获取患者信息列表api
export const getPatientListAPI = () => req<PatientList>("/patient/mylist");

// 添加患者信息api
export const addPatientAPI = (patientInfo: PatientInfo) => {
  return req<PatientInfo>("/patient/add", "post", patientInfo);
};

// 编辑患者信息api
export const editPatientAPI = (patientInfo: PatientInfo) => {
  return req<PatientInfo>("/patient/update", "put", patientInfo);
};

// 删除患者信息api
export const deletePatientAPI = (id: string) =>
  req<PatientInfo>(`/patient/del/${id}`, "delete");
