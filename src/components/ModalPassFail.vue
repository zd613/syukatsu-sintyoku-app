<script setup lang="ts">
import type { ProgressStepStatus } from "@/types/types";
import { ref } from "vue";
import IconCheckCircle from "./icons/IconCheckCircle.vue";
import IconXCircle from "./icons/IconXCircle.vue";

type PassOrFail = Extract<ProgressStepStatus, "passed" | "failed">;

const visible = ref(false);
const promiseInfo = ref({
  resolve: null as null | ((status: PassOrFail) => void),
});

// コンポーネント外から呼び出す
// modalを開く
const open = (): Promise<PassOrFail> => {
  visible.value = true;
  return new Promise((resolve) => {
    promiseInfo.value.resolve = resolve;
  });
};

defineExpose({
  open,
});

const onFailClick = () => {
  visible.value = false;
  promiseInfo.value.resolve?.("failed");
};

const onPassClick = () => {
  visible.value = false;
  promiseInfo.value.resolve?.("passed");
};
</script>

<template>
  <div v-if="visible" class="z-20 p-4 absolute top-0 left-0 w-full h-full">
    <div
      class="border border-purple-400 flex w-full h-full bg-gray-700/50 rounded-xl"
    >
      <div
        class="w-full h-full flex items-center justify-center border-r border-purple-400"
      >
        <a @click="onFailClick">
          <IconXCircle class="w-24 h-24 text-red-400" />
        </a>
      </div>
      <div
        class="w-full h-full flex items-center justify-center border-l border-purple-400"
      >
        <a @click="onPassClick">
          <IconCheckCircle class="w-24 h-24 text-green-400" />
        </a>
      </div>
    </div>
  </div>
</template>
