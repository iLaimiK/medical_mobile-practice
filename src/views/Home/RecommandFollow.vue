<script setup lang="ts">
import { useFollow } from "@/composables";
import { getDoctorPageAPI } from "@/services/consult";
import type { DoctorList, PageParams } from "@/types/consult";
import { throttle } from "lodash";
import { ref } from "vue";

const loading = ref(false);
const finished = ref(false);

const list = ref<DoctorList>([]);
const params = ref<PageParams>({
  current: 1,
  pageSize: 10,
});

const onLoad = async () => {
  // 加载更多
  const res = await getDoctorPageAPI(params.value);
  list.value.push(...res.data.rows);
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true;
  } else {
    params.value.current++;
  }
  loading.value = false;
};

const throttleOnLoad  = throttle(onLoad, 500);
const { loading: onLoading, follow } = useFollow();
</script>

<template>
  <div class="recommend-follow">
    <BeginNavBar title="推荐关注"></BeginNavBar>
    <div class="content">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="throttleOnLoad"
      >
        <div class="item" v-for="doc in list" :key="doc.id">
          <van-image round class="avatar" :src="doc.avatar"></van-image>
          <div class="info">
            <p class="name">
              {{ doc.name
              }}<span class="dep van-ellipsis"
                >{{ doc.depName }} | {{ doc.positionalTitles }}</span
              >
            </p>
            <p class="hospital">
              <span class="hospitalGrade">{{ doc.gradeName }}</span
              >医院
            </p>
          </div>
          <van-button
            :loading="onLoading"
            @click="follow(doc)"
            class="btn"
            size="small"
            round
          >
            {{ doc.likeFlag ? "已关注" : "关注" }}
          </van-button>
        </div>
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recommend-follow {
  padding-top: 46px;
  .content {
    .item {
      display: flex;
      align-items: center;
      padding: 20px 15px;
      border-bottom: 1px solid #d3d3d3ab;
      .avatar {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
      .info {
        flex: 1;
        .name {
          color: var(--cp-text1);
          font-weight: 500;
          line-height: 18px;
          font-size: 18px;
          .dep {
            color: var(--cp-tip);
            font-size: 14px;
            margin-left: 5px;
          }
        }
        .hospital {
          color: var(--cp-text2);
          .hospitalGrade {
            background-color: #476eee;
            color: #fff;
            padding: 3px 6px;
            font-size: 11px;
            border-radius: 2px;
            margin-right: 5px;
          }
        }
      }
      .btn {
        padding: 0 12px;
        border-color: transparent;
        background-color: #eafaf7;
        color: var(--cp-primary);
        height: 32px;
        width: 62px;
      }
    }
  }
}
</style>
