<script setup lang="ts">
import { getDoctorPageAPI } from "@/services/consult";
import type { DoctorList } from "@/types/consult";
import { useWindowSize } from "@vueuse/core";
import { onMounted, ref } from "vue";
import DoctorCard from "./DoctorCard.vue";

const { width } = useWindowSize();

const list = ref<DoctorList>()

const loadData = async () => {
    const res = await getDoctorPageAPI({
        current: 1,
        pageSize: 10
    })
    list.value = res.data.rows

}

onMounted(() => {
    loadData()
})
</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <router-link to="/home/recommendfollow"> 查看更多<i class="van-icon van-icon-arrow" /></router-link>
    </div>
    <div class="body">
      <van-swipe
        :width="(150 / 375) * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :d="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
