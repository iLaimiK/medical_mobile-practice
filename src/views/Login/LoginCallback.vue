<script setup lang="ts">
/* Global QC */
import { useMobileCode } from "@/composables";
import { bindMobileAPI, loginByQQAPI } from "@/services/user";
import { useUserStore } from "@/stores/modules/user";
import type { User } from "@/types/user";
import { codeRules, mobileRules } from "@/utils/rules";
import { showSuccessToast, showToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const openId = ref("");
const isNeedBind = ref(false);

if (QC.Login.check()) {
  QC.Login.getMe((id: string) => {
    openId.value = id;
    // QQ登录
    loginByQQAPI(id)
      .then((res) => {
        onQQLogin(res);
      })
      .catch(() => {
        isNeedBind.value = true;
      });
  });
}

// 表单相关
const mobile = ref<string>("");
const SMScode = ref<string>("");
const agreementChecked = ref<boolean>(false);

// 验证码相关
const { sendCode, time, form } = useMobileCode(mobile, "bindMobile");
const codeText = computed(() =>
  time.value > 0 ? `${time.value}s后重新获取` : "获取验证码",
);

// 提交按钮禁用
const isFormComplete = computed(
  () => mobile.value.trim() !== "" && SMScode.value.trim() !== "",
);

const userStore = useUserStore();
const router = useRouter();
// QQ登录成功逻辑
const onQQLogin = (res: { data: User }) => {
  userStore.loginUser(res.data);
  router.replace("/user");
  showSuccessToast("登录成功");
};
// 绑定
const onBind = async () => {
  if (!agreementChecked.value) {
    return showToast("请同意用户协议及隐私条款");
  }
  const res = await bindMobileAPI(mobile.value, SMScode.value, openId.value);
  onQQLogin(res);
};

onMounted(() => {});
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <BeginNavBar></BeginNavBar>
    <div class="login-tabs">
      <BeginTabContainer name1="手机绑定"></BeginTabContainer>
      <span>展示用页面</span>
    </div>
    <!-- 表单 -->
    <div class="login-form">
      <van-form ref="form" @submit="onBind">
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
            立即绑定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/login.scss";
</style>
