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
