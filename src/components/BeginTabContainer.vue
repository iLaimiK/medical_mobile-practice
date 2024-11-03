<script setup lang="ts">
type Props = {
  name1?: string;
  name2?: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "tab2-click"): void;
}>();

const handleClick = () => {
  emit("tab2-click");
};
</script>

<template>
  <div class="tab-container">
    <h3 class="tab-item1">{{ props.name1 }}</h3>
    <div v-if="props.name2" class="tab-item2" @click="handleClick">
      <span>{{ props.name2 }}</span>
      <van-icon name="arrow"></van-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 30px 30px 50px;
  line-height: 1;
  h3 {
    font-weight: 400;
    font-size: 24px;
  }
  .tab-item2 {
    font-size: 15px;
    cursor: pointer;
    color: var(--cp-text2);
  }
}
</style>
