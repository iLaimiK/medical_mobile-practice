<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter()

type Props = {
    title?: string,
    rightText?: string
}

const props = defineProps<Props>()

// 左侧按钮点击事件
const onClickLeft = () => {
    // 判断历史记录中是否有上一页
    if (history.state?.back) {
        router.back()
    } else {
        router.push("/")
    }
};

// 右侧按钮点击事件
const emit = defineEmits<(e: "right-click") => void>()
const onClickRight = () => {
    emit("right-click")
}
</script>

<template>
  <van-nav-bar
    fixed
    :title="props.title"
    :right-text="props.rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
