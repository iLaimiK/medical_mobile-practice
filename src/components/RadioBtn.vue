<script setup lang="ts">
type Options = {
  label: string;
  value: string | number;
};

type Props = {
  options: Options[];
  modelValue?: string | number;
};

const props = defineProps<Props>();

// 标签切换
const emit = defineEmits<(e: "update:modelValue", value: string | number) => void>();

const toggleItem = (value: string | number) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="radio-btn">
    <div
      class="item"
      v-for="item in props.options"
      :key="item.value"
      :class="{ active: props.modelValue === item.value }"
      @click="toggleItem(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    box-sizing: border-box;
    height: 32px;
    min-width: 60px;
    margin: 0 10px 10px;
    padding: 0 14px;
    line-height: 28px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    color: var(--cp-text2);
    transition: all 0.3s;
    cursor: pointer;
    &.active {
      background-color: var(--cp-plain);
      border-color: var(--cp-primary);
    }
  }
}
</style>
