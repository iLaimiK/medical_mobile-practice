<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="{ active }">
          <SvgIcon
            :name="`home-index-${active ? 'active' : 'default'}`"
          ></SvgIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        <span>健康百科</span>
        <template #icon="{ active }">
          <SvgIcon
            :name="`home-article-${active ? 'active' : 'default'}`"
          ></SvgIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        <span>消息中心</span>
        <template #icon="{ active }">
          <SvgIcon
            :name="`home-notice-${active ? 'active' : 'default'}`"
          ></SvgIcon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>我的</span>
        <template #icon="{ active }">
          <SvgIcon
            :name="`home-mine-${active ? 'active' : 'default'}`"
          ></SvgIcon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 12px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
