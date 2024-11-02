<script setup lang="ts">
const fn = () => console.log("fn")
</script>

<template>
  <div class="login-page">
    <BeginNavBar @right-click="fn" right-text="注册"></BeginNavBar>
    Login
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
}
</style>
