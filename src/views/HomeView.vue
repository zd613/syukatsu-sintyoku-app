<script setup lang="ts">
import RounedButton from "../components/RounedButton.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { useRouter } from "vue-router";
import { useCompanyProgressStore } from "@/stores/project";
import ProgressStepList from "../components/ProgressStepList.vue";
import IconTrash from "../components/icons/IconTrash.vue";
import ModalPassFail from "../components/ModalPassFail.vue";
import { ref } from "vue";

const companyProgressStore = useCompanyProgressStore();

const router = useRouter();
const onAddNewCompanyButtonClick = () => {
  router.push("/add-new-company");
};

const onDeleteButtonClick = (id: string) => {
  const ok = confirm("削除してもよろしいですか？");
  if (!ok) {
    return;
  }

  companyProgressStore.deleteProgress(id);
  alert("削除しました。");
};

// モーダルのcomponentの参照
const modalPassFail = ref<null | InstanceType<typeof ModalPassFail>>(null);
const onWaitingStepClick = async (id: string, stepIndex: number) => {
  console.log(id);
  console.log(stepIndex);
  const passOrFail = await modalPassFail.value?.open();

  if (!passOrFail) {
    // TODO: エラー処理
    throw new Error("pass of fail is undefined");
  }

  companyProgressStore.updateProgressStepStatus(id, {
    stepIndex,
    status: passOrFail,
  });
};
</script>

<template>
  <div class="w-full h-full absolute">
    <main
      v-if="companyProgressStore.progressList.length > 0"
      class="w-full h-full overflow-y-scroll"
    >
      <div
        v-for="progress in companyProgressStore.progressList"
        :key="progress.id"
        class="p-2"
      >
        <div class="flex items-center justify-between">
          <div class="border-b-2 text-lg font-bold">
            {{ progress.companyName }}
          </div>

          <div>
            <button type="button" @click="onDeleteButtonClick(progress.id)">
              <IconTrash />
            </button>
          </div>
        </div>

        <ProgressStepList
          :progress-steps="progress.progressSteps"
          class="border-b pb-4 pt-2"
          @click:waiting="onWaitingStepClick(progress.id, $event)"
        />
      </div>
    </main>
    <main v-else class="w-full h-full flex items-center justify-center">
      <div class="w-full h-full flex justify-center items-center">
        まだ追加された選考がありません。<br />
        右下のボタンから追加してください。
      </div>
    </main>

    <div class="fixed bottom-4 right-4">
      <RounedButton
        class="rounded-button w-14 h-14 shadow-lg"
        @click="onAddNewCompanyButtonClick"
      >
        <IconPlus />
      </RounedButton>
    </div>
    <Teleport to="#modal">
      <ModalPassFail ref="modalPassFail" />
    </Teleport>
  </div>
</template>

<style scoped>
.rounded-button:active {
  transform: translateY(2px);
}
</style>
