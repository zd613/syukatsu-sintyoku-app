<script setup lang="ts">
import RounedButton from "../components/RounedButton.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { useRouter } from "vue-router";
import { useCompanyProgressStore } from "@/stores/project";
import ProgressStepList from "../components/ProgressStepList.vue";

const companyProgressStore = useCompanyProgressStore();

const router = useRouter();
const onAddNewCompanyButtonClick = () => {
  router.push("/add-new-company");
};
</script>

<template>
  <div class="w-full h-full absolute">
    <main v-if="companyProgressStore.progressList.length > 0">
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

        <ProgressStepList :progress-steps="progress.progressSteps" />
      </div>
    </main>
    <main v-else class="w-full h-full flex items-center justify-center">
      <div class="w-full h-full flex justify-center items-center">
        まだ追加された選考がありません。<br />
        右下のボタンから追加してください。
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
