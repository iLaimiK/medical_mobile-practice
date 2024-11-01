<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user";
import { type User } from "@/types/user";
import { req } from "@/utils/request";

const userStore = useUserStore();

const getUser = () => {
  req("/patient/myUser");
};

const login = async () => {
  try {
    const res = await req<User>("/login/password", "post", {
      mobile: "13211112222",
      password: "abc12345",
    });
    console.log("登录成功", res);
  } catch (err) {
    console.error((err as Error).message);
  }
};
</script>

<template>
  <div>App</div>
  <p>{{ userStore.user }}</p>
  <button
    @click="
      userStore.loginUser({
        id: '1',
        mobile: '1',
        account: '1',
        avatar: '1',
        token: '1',
      })
    "
  >
    登录
  </button>
  <button @click="userStore.logoutUser()">退出</button>
  <button @click="getUser()">获取用户信息</button>
  <button @click="login()">接口登录</button>
</template>

<style scoped>
a {
  color: var(--cp-primary);
}
</style>
