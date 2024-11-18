<script setup lang="ts">
import { uploadFileAPI } from "@/services/global";
import { useUserStore } from "@/stores/modules/user";
import { clearAllCache } from "@/utils/cacheClear";
import { showConfirmDialog, showDialog, showToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

const userInfo = store.user;
// 退出登录
const logout = async () => {
  await showConfirmDialog({
    title: "提示",
    message: "确定要退出登录吗？",
  });
  store.logoutUser();
  router.replace("/login");
};
// 清除缓存
const clearCache = async () => {
  await clearAllCache();
  showToast("清除缓存成功");
  location.reload();
};
// 检查更新
const checkUpdate = () => {
  showToast("当前已是最新版本");
};

// 更换头像
const show = ref(false);
const actions = [{ name: "拍照" }, { name: "相册" }];

const showActionSheet = () => {
  show.value = true;
};

const onSelect = async (item: { name: string }) => {
  show.value = false;
  if (item.name === "拍照") {
    // 拍照
    showDialog({
      message: "浏览器怎么拍照啊？调用摄像头吗？摄像头也拍不了照吧",
      confirmButtonText: "罢了",
    });
  } else {
    // 相册
    showConfirmDialog({
        message: "仅作上传用，无法更改头像",
    }).then(() => {
      selectPhotoFromAlbum();
    })
  }
};

// 从相册中选择照片
const uploadedFile = ref<string | null>();
const selectPhotoFromAlbum = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        const res = await uploadFileAPI(file);
        uploadedFile.value = res.data.url;
        showToast("上传成功");
      } catch (error) {
        // console.log(error);
        showToast((error as { message: string })?.message);
      }
    }
  };
  input.click();
};
</script>

<template>
  <div class="user-setting">
    <BeginNavBar title="设置"></BeginNavBar>
    <div class="user-profile">
      <van-cell title="头像" is-link @click="showActionSheet" />
      <van-cell title="用户名" :value="userInfo?.account" is-link />
      <van-cell title="手机号码" :value="userInfo?.mobile" is-link />
      <van-cell title="修改密码" is-link />
      <van-cell title="微信" is-link>
        <template #value>
          <span class="bind">去绑定</span>
        </template>
      </van-cell>
    </div>
    <div class="other-setting">
      <van-cell title="清除缓存" is-link @click="clearCache" />
      <van-cell title="检查更新" is-link @click="checkUpdate" />
      <van-cell title="关于我们" is-link to="/about" />
    </div>
    <div class="logout-btn">
      <van-button type="default" block @click="logout">退出登录</van-button>
    </div>
  </div>
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    @select="onSelect"
    cancel-text="取消"
    close-on-click-action
  />
</template>

<style scoped lang="scss">
.user-setting {
  min-height: calc(100vh - 46px);
  padding-top: 46px;
  background-color: var(--cp-bg);
  :deep() {
    .van-cell__title,
    .van-cell__value {
      font-size: 16px;
    }
  }
  .user-profile {
    .bind {
      color: var(--van-cell-text-color);
    }
  }
  .other-setting {
    margin-top: 10px;
  }
  .logout-btn {
    margin-top: 20px;
    .van-button {
      border-radius: 0;
      &--default {
        border-color: var(--van-button-default-background);
      }
      :deep(.van-button__text) {
        color: var(--van-danger-color);
      }
    }
  }
}
</style>
