<script setup lang="ts">
import type { ProgressStep, ProgressStepStatus } from "@/types/types";

defineProps<{
  progressSteps: ProgressStep[];
}>();

const emits = defineEmits<{
  /* eslint no-unused-vars: off */
  (e: "click:waiting", stepIndex: number): void;
}>();

function getClassName(status: ProgressStepStatus) {
  switch (status) {
    case "waiting":
      return "waiting";
    case "planned":
      return "planned";
    case "passed":
      return "passed";
    case "failed":
      return "failed";
    case "canceled":
      return "canceled";
    default:
      throw new Error("not implemented");
  }
}

const onWaitingStepClick = (stepIndex: number) => {
  emits("click:waiting", stepIndex);
};
</script>

<template>
  <div>
    <div v-for="(step, j) in progressSteps" :key="j" class="inline">
      <div :class="getClassName(step.status)" class="inline">
        <a v-if="step.status === 'waiting'" @click="onWaitingStepClick(j)">{{
          step.name
        }}</a>
        <span v-else>{{ step.name }}</span>
      </div>
      <span class="px-2">></span>
    </div>

    <span class="text-gray-100/50">内定</span>
  </div>
</template>

<style scoped>
.waiting {
  @apply text-gray-50 underline;
}
.planned {
  @apply text-gray-100/50;
}
.passed {
  @apply text-green-400;
}

.failed {
  @apply text-red-400;
}
.canceled {
  @apply text-gray-100/20;
}
</style>
