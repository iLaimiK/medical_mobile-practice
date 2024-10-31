import type { User } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
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
      user,
      loginUser,
      logoutUser,
    };
  },
  {
    persist: {
      key: "cp-user",
      pick: ["user", "loginUser", "logoutUser"],
    },
  },
);
