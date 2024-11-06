// 登录表单校检
export const mobileRules = [
  {
    required: true,
    message: "请输入手机号",
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: "请输入正确的手机号",
  },
];

export const pwdRules = [
  {
    required: true,
    message: "请输入密码",
  },
  {
    pattern: /^\w{8,24}$/,
    message: "密码长度在8-24位",
  },
];

export const codeRules = [
  {
    required: true,
    message: "请输入验证码",
  },
  {
    pattern: /^\d{6}$/,
    message: "请输入6位数字验证码",
  },
];
