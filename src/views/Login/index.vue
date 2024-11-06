<script setup lang="ts">
import { useMobileCode } from "@/composables";
import { loginByCodeAPI, loginByPwdAPI } from "@/services/user";
import { useUserStore } from "@/stores/modules/user";
import { codeRules, mobileRules, pwdRules } from "@/utils/rules";
import { showSuccessToast, showToast } from "vant";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 顶部右侧按钮点击事件
const toRegister = () => {
  router.push("/register");
};

// 表单相关
const username = ref<string>("");
const password = ref<string>("");
const SMScode = ref<string>("");
const agreementChecked = ref<boolean>(false);

// 是否隐藏密码
const isHidePwd = ref<boolean>(true);

// 登录
const onLogin = async () => {
  if (!agreementChecked.value) {
    return showToast("请同意用户协议及隐私条款");
  }
  // 登录逻辑
  const res = isPwdLogin.value
    ? await loginByPwdAPI(username.value, password.value)
    : await loginByCodeAPI(username.value, SMScode.value);

  userStore.loginUser(res.data);
  // 判断是否有回跳地址
  router.push((route.query.returnUrl as string) || "/user");
  showSuccessToast("登录成功");
};

// 验证码相关
const { sendCode, time, form } = useMobileCode(username, "login");
const codeText = computed(() =>
  time.value > 0 ? `${time.value}s后重新获取` : "获取验证码",
);


// 界面切换
const isPwdLogin = ref<boolean>(true);
const mainText = computed(() => (isPwdLogin.value ? "密码登录" : "验证码登录"));
const subText = computed(() => (isPwdLogin.value ? "验证码登录" : "密码登录"));
const switchLoginType = () => {
  isPwdLogin.value = !isPwdLogin.value;
};

// 登录按钮禁用
const isFormComplete = computed(() => {
  if (isPwdLogin.value) {
    return username.value.trim() !== "" && password.value.trim() !== "";
  } else {
    return username.value.trim() !== "" && SMScode.value.trim() !== "";
  }
});
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <BeginNavBar @right-click="toRegister" right-text="注册"></BeginNavBar>
    <!-- 切换标签 -->
    <div class="login-tabs">
      <BeginTabContainer
        :name1="mainText"
        :name2="subText"
        @tab2-click="switchLoginType"
      ></BeginTabContainer>
      <span v-show="!isPwdLogin"
        >模拟生成验证码，请从调试的 network 获取验证码！</span
      >
    </div>
    <!-- 表单 -->
    <div class="login-form">
      <van-form ref="form" @submit="onLogin">
        <van-cell-group>
          <van-field
            v-model="username"
            name="mobile"
            placeholder="请输入手机号码"
            :rules="mobileRules"
          />
          <van-field
            v-if="isPwdLogin"
            v-model="password"
            :type="isHidePwd ? 'password' : 'text'"
            name="password"
            placeholder="请输入密码"
            :rules="pwdRules"
          >
            <template #button>
              <SvgIcon
                @click="isHidePwd = !isHidePwd"
                :name="`login-eye-${isHidePwd ? 'on' : 'off'}`"
              ></SvgIcon>
            </template>
          </van-field>
          <van-field
            v-else
            v-model="SMScode"
            name="SMScode"
            placeholder="请输入验证码"
            :rules="codeRules"
          >
            <template #button>
              <span
                class="SMScode-send"
                :class="{ active: time > 0 }"
                @click="sendCode"
                >{{ codeText }}</span
              >
            </template>
          </van-field>
        </van-cell-group>
        <div class="agreement-cell">
          <van-checkbox v-model="agreementChecked">
            <span>我已同意</span>
            <a href="javascript:;">用户协议</a>
            <span>及</span>
            <a href="javascript:;">隐私条款</a>
          </van-checkbox>
        </div>
        <div class="submit-btn">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="!isFormComplete"
          >
            登录
          </van-button>
        </div>
        <div class="pwd-forget">
          <a href="javascript:;">忘记密码?</a>
        </div>
      </van-form>
    </div>
    <LoginOther></LoginOther>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/login.scss";
</style>
