<script setup lang="ts">
import { useFollow } from "@/composables";
import type { Knowledge } from "@/types/consult";

defineProps<{ k: Knowledge }>();

const { loading, follow } = useFollow();
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" :src="k.creatorAvatar"></van-image>
      <div class="info">
        <p class="name">{{ k.creatorName }}</p>
        <p class="dep van-ellipsis">
          {{ k.creatorHospatalName }} {{ k.creatorDep }} {{ k.creatorTitles }}
        </p>
      </div>
      <van-button
        :loading="loading"
        @click="follow(k)"
        class="btn"
        size="small"
        round
      >
        {{ k.likeFlag ? "已关注" : "+ 关注" }}
      </van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">{{ k.title }}</h3>
      <p class="tag">
        <span># {{ k.topic }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">
        {{ k.content.replace(/<[^>]+>/g, "") }}
      </p>
      <div class="imgs" :class="{ large: k.coverUrl.length === 1 }">
        <van-image
          fit="cover"
          v-for="(img, i) in k.coverUrl"
          :key="i"
          :src="img"
        />
      </div>
      <p class="logs">
        <span>{{ k.collectionNumber }} 收藏</span>
        <span>{{ k.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 200px;
      padding-right: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
