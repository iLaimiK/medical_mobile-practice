<script setup lang="ts">
import { showConfirmDialog } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
/* Global QC */
const qqLogin = () => {
  showConfirmDialog({
    title: "温馨提示",
    message: "第三方登录不可用，虽然可以跳转，但请勿登录。这里可以直接前往绑定页面",
    confirmButtonText: "跳转至QQ登录",
    cancelButtonText: "前往绑定页面",
  })
    .then(() => {
      QC.Login.showPopup({
        appId: "102015968",
        redirectURI: "http://consult-patients.itheima.net/login/callback",
      });
    })
    .catch(() => {
      router.push("/login/callback");
    });
};
</script>

<template>
  <div class="login-other" @click="qqLogin">
    <van-divider>第三方登录</van-divider>
    <div class="icon">
      <img src="@/assets/qq.svg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-other {
  position: absolute;
  bottom: 0;
  width: 99%;
  margin-bottom: 50px;
  .van-divider {
    padding: 0 60px;
  }
  .icon {
    display: flex;
    justify-content: center;
    img {
      width: 36px;
      height: 36px;
    }
  }
}
@media screen and (min-height: 720px) {
  .login-other {
    margin-bottom: 40px;
  }
}
</style>
