<script setup lang="ts">
import RounedButton from "../components/RounedButton.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { useRouter } from "vue-router";
import { useCompanyProgressStore } from "@/stores/project";
import type { ProgressStep } from "@/types/types";

const companyProgressStore = useCompanyProgressStore();

const router = useRouter();
const onAddNewCompanyButtonClick = () => {
  router.push("/add-new-company");
};

// 現在のstepのindexを取得
function getCurrentStepIndex(progressSteps: ProgressStep[]) {
  for (let i = 0; i < progressSteps.length; i++) {
    if (progressSteps[i].status === "waiting") {
      return i;
    }
  }
  return progressSteps.length;
}
</script>

<template>
  <div>
    <main>
      <div
        v-for="(progress, i) in companyProgressStore.progressList"
        :key="i"
        class="p-2"
      >
        <div class="">
          <span class="border-b-2 text-lg font-bold">{{
            progress.companyName
          }}</span>
        </div>
        <div>
          <span
            v-for="(step, j) in progress.progressSteps"
            :key="j"
            :class="
              j === getCurrentStepIndex(progress.progressSteps)
                ? 'text-gray-50'
                : 'text-gray-100/50'
            "
          >
            {{ step.name }} >
          </span>
          <span class="text-gray-100/50">内定</span>
        </div>
      </div>
    </main>

    <div class="fixed w-400 bottom-0 right-0 mr-4 mb-4">
      <RounedButton
        class="rounded-button w-12 h-12 shadow-lg"
        @click="onAddNewCompanyButtonClick"
      >
        <IconPlus />
      </RounedButton>
    </div>
  </div>
</template>

<style scoped>
.rounded-button:active {
  transform: translateY(2px);
}
</style>
