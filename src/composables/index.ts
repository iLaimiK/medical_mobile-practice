import { followOrUnfollowAPI } from "@/services/consult";
import { sendCodeAPI } from "@/services/user";
import type { FollowType } from "@/types/consult";
import type { CodeType } from "@/types/user";
import { showSuccessToast, type FormInstance } from "vant";
import { onUnmounted, ref, type Ref } from "vue";

// 发送验证码
export const useMobileCode = (mobile: Ref<string>, type: CodeType) => {
  const form = ref<FormInstance>();
  const time = ref<number>(0);
  let timeId: number;
  const sendCode = async () => {
    if (time.value > 0) {
      return;
    }
    await form.value?.validate("mobile");
    await sendCodeAPI(mobile.value, type);
    showSuccessToast("发送成功");
    time.value = 60;
    timeId = window.setInterval(() => {
      time.value--;
      if (time.value <= 0) {
        window.clearInterval(timeId);
      }
    }, 1000);
  };

  // 页面卸载
  onUnmounted(() => {
    window.clearInterval(timeId);
  });

  return { sendCode, time, form };
};

// 关注或取消关注
export const useFollow = (type: FollowType = "doc") => {
  const loading = ref(false);
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true;
    try {
      await followOrUnfollowAPI(item.id, type);
      item.likeFlag = item.likeFlag === 1 ? 0 : 1;
    } finally {
      loading.value = false;
    }
  };
  return { loading, follow };
};
