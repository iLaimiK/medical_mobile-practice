// 注册id
export type UserId = string;

// 用户信息
export type User = {
  /* token */
  token: string;
  /* refreshToken */
  refreshToken: string;
  /* 用户id */
  id: UserId;
  /* 昵称 */
  account?: string;
  /* 手机 */
  mobile?: string;
  /* 头像 */
  avatar: string;
};

// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType =
  | "login"
  | "register"
  | "changeMobile"
  | "forgetPassword"
  | "bindMobile";

// 个人信息
type OmitUser = Omit<User, "token" | "refreshToken">;
export type UserInfo = OmitUser & {
  /* 关注 */
  likeNumber: number;
  /* 收藏 */
  collectionNumber: number;
  /* 积分 */
  score: number;
  /* 优惠券数量 */
  couponNumber: number;
  /* 订单信息 */
  orderInfo: {
    /* 待付款 */
    paidNumber: number;
    /* 待发货 */
    receivedNumber: number;
    /* 待收货 */
    shippedNumber: number;
    /* 已完成 */
    finishedNumber: number;
  };
};

// 患者信息
export type PatientInfo = {
  /* 患者id */
  id?: string;
  /* 患者姓名 */
  name: string;
  /* 身份证号 */
  idCard: string;
  /* 0不默认  1默认 */
  defaultFlag: 0 | 1;
  /* 0 女  1 男 */
  gender: 0 | 1;
  /**性别文字 */
  genderValue?: string;
  /* 年龄 */
  age?: number;
};

// 患者列表
export type PatientList = PatientInfo[];