<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';

const userStore = useUserStore()
</script>

<template>
  <div>App</div>
  <p>{{ userStore.user }}</p>
  <button @click="userStore.loginUser({id: '1', mobile: '1', account: '1', avatar: '1', token: '1'})">登录</button>
  <button @click="userStore.logoutUser()">退出</button>
</template>

<style scoped>
a {
  color: var(--cp-primary);
}
</style>
