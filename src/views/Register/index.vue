<script setup lang="ts">
import { useMobileCode } from "@/composables";
import { registerAPI } from "@/services/user";
import { useUserStore } from "@/stores/modules/user";
import { codeRules, mobileRules, pwdRules } from "@/utils/rules";
import { showSuccessToast, showToast } from "vant";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

// 顶部右侧按钮点击事件
const toLogin = () => {
  router.push("/login");
};

// 表单相关
const mobile = ref<string>("");
const password = ref<string>("");
const SMScode = ref<string>("");
const agreementChecked = ref<boolean>(false);

// 是否隐藏密码
const isHidePwd = ref<boolean>(true);

// 验证码相关
const { sendCode, time, form } = useMobileCode(mobile, "register");
const codeText = computed(() =>
  time.value > 0 ? `${time.value}s后重新获取` : "获取验证码",
);

// 注册
const onRegister = async () => {
  if (!agreementChecked.value) {
    return showToast("请同意用户协议");
  }
  // 注册逻辑
  const res = await registerAPI(mobile.value, SMScode.value, password.value);

  userStore.registerUser(res.data);
  // 判断是否有回跳地址
  router.push("/login");
  showSuccessToast("登录成功");
};

// 提交按钮禁用
const isFormComplete = computed(
  () =>
    mobile.value.trim() !== "" &&
    SMScode.value.trim() !== "" &&
    password.value.trim() !== "",
);
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <BeginNavBar @right-click="toLogin" right-text="登录"></BeginNavBar>
    <div class="login-tabs">
      <BeginTabContainer name1="注册"></BeginTabContainer>
      <span>注册功能完整，但请勿使用！！！</span>
    </div>
    <!-- 表单 -->
    <div class="login-form">
      <van-form ref="form" @submit="onRegister">
        <van-cell-group>
          <van-field
            v-model="mobile"
            name="mobile"
            placeholder="请输入手机号码"
            :rules="mobileRules"
          />
          <van-field
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
          <van-field
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
        </van-cell-group>
        <div class="agreement-cell">
          <van-checkbox v-model="agreementChecked">
            <span>我已同意</span>
            <a href="javascript:;">用户协议</a>
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
            确认注册
          </van-button>
        </div>
      </van-form>
    </div>
    <LoginOther></LoginOther>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/login.scss";
</style>
