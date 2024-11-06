import type { User, UserId } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 用户注册 ID
    const registerId = ref<UserId>();
    // 用户注册
    const registerUser = (userId: UserId) => {
      registerId.value = userId;
    };
    // 用户信息
    const user = ref<User>();
    // 用户登录
    const loginUser = (userInfo: User) => {
      user.value = userInfo;
    };
    // 用户退出
    const logoutUser = () => {
      user.value = undefined;
    };

    return {
      registerId,
      user,
      loginUser,
      logoutUser,
      registerUser,
    };
  },
  {
    persist: {
      key: "cp-user",
      pick: ["user", "loginUser", "logoutUser"],
    },
  },
);
