import type { FieldRule } from "vant";

// 登录表单校检
export const mobileRules: FieldRule[] = [
  {
    required: true,
    message: "请输入手机号",
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: "请输入正确的手机号",
  },
];

export const pwdRules: FieldRule[] = [
  {
    required: true,
    message: "请输入密码",
  },
  {
    pattern: /^\w{8,24}$/,
    message: "密码长度在8-24位",
  },
];

export const codeRules: FieldRule[] = [
  {
    required: true,
    message: "请输入验证码",
  },
  {
    pattern: /^\d{6}$/,
    message: "请输入6位数字验证码",
  },
];

// 患者表单校检
export const nameRules: FieldRule[] = [
  {
    required: true,
    message: "请输入患者姓名",
  },
  {
    pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
    message: "请输入正确的患者姓名，2-16个中文字符",
  },
];

export const idCardRules: FieldRule[] = [
  {
    required: true,
    message: "请输入身份证号",
  },
  {
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: "请输入正确的身份证号",
  },
];
