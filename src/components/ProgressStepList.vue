<script setup lang="ts">
import type { ProgressStep, ProgressStepStatus } from "@/types/types";

defineProps<{
  progressSteps: ProgressStep[];
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
</script>

<template>
  <div>
    <div v-for="(step, j) in progressSteps" :key="j" class="inline">
      <span :class="getClassName(step.status)">
        {{ step.name }}
      </span>
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
