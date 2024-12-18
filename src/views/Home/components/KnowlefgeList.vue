<script setup lang="ts">
import { getKnowledgePageAPI } from "@/services/consult";
import type {
    KnowledgeList,
    KnowledgeParams,
    KnowledgeType,
} from "@/types/consult";
import { throttle } from "lodash";
import { onMounted, ref } from "vue";
import KnowledgeCard from "./KnowledgeCard.vue";

type Props = {
  type: KnowledgeType;
};

const props = defineProps<Props>();

const loading = ref(false);
const finished = ref(false);

const list = ref<KnowledgeList>([]);
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10,
});

const onLoad = async () => {
  // 加载更多
  const res = await getKnowledgePageAPI(params.value);
  console.log(res);
  list.value.push(...res.data.rows);
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true;
  } else {
    params.value.current++;
  }
  loading.value = false;
};
const throttleOnLoad = throttle(onLoad, 500);

onMounted(() => {
  finished.value = false;
});
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="throttleOnLoad"
    >
      <knowledge-card
        v-for="item in list"
        :key="item.id"
        :k="item"
      ></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
