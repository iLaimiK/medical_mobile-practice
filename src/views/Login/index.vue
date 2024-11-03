<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toRegister = () => {
  router.push("/register");
};

// 表单相关
const username = ref("");
const password = ref("");
const onSubmit = (values: unknown) => {
  console.log("submit", values);
};

const checked = ref(false);
</script>

<template>
  <div class="login-page">
    <!-- 顶部导航 -->
    <BeginNavBar @right-click="toRegister" right-text="注册"></BeginNavBar>
    <!-- 切换标签 -->
    <div class="login-tabs">
      <BeginTabContainer
        name1="密码登录"
        name2="手机验证码登录"
      ></BeginTabContainer>
    </div>
    <!-- 表单 -->
    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="username"
            name="mobile"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '请填手机号码' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="agreement-cell">
          <van-checkbox v-model="checked">
            <span>我已同意</span>
            <a href="javascript:;">用户协议</a>
            <span>及</span>
            <a href="javascript:;">隐私条款</a>
          </van-checkbox>
        </div>
        <div class="submit-btn">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="pwd-forget">
          <a href="javascript:;">忘记密码?</a>
        </div>
      </van-form>
    </div>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  padding-top: 46px;
}
.login-form {
  padding: 0 15px;
  .van-form {
    .van-cell-group {
      padding: 0 var(--van-cell-horizontal-padding);
      .van-cell {
        position: inherit;
        padding: var(--van-cell-vertical-padding) 0;
      }
    }
    .van-hairline--top-bottom {
      position: inherit;
    }
    .van-field {
      border-bottom: 1px solid #e5e5e5;
    }
    .agreement-cell {
      box-sizing: border-box;
      padding: 15px 18px;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
    .submit-btn {
      padding: 5px 5px 0;
    }
    .pwd-forget {
      text-align: center;
      padding: 15px;
      a {
        color: var(--cp-text3);
      }
    }
  }
}

.login-other {
  position: absolute;
  bottom: 0;
  width: 100%;
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
</style>
