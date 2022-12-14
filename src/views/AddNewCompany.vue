<script setup lang="ts">
import { useCompanyProgressStore } from "@/stores/project";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import TextInput from "../components/TextInput.vue";
import type { ProgressStep } from "@/types/types";
import { useForm } from "vee-validate";
import { nanoid } from "nanoid";
// TODO: tree shaking
import * as yup from "yup";
import ModalProgressCustom from "@/components/ModalProgressCustom.vue";

const formSchema = {
  companyName: yup.string().required("会社名の入力は必須です。"),
};
const { errors: formErrors, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const selectedProgress = ref("0");

const dummyTemplates = [
  {
    name: "テンプレート1",
    progress: ["書類選考", "面談1", "面談(最終)"],
  },
  {
    name: "テンプレート2",
    progress: ["書類選考", "面談1", "面談2", "面談(最終)"],
  },
  {
    name: "テンプレート3",
    progress: ["書類選考", "面談1", "課題", "面談2"],
  },
];

const custom = ref({
  name: "カスタム",
  progress: ["書類選考", "面談(最終)"],
});

function createInitialProgressSteps(progressNames: string[]) {
  const progressSteps = progressNames.map(
    (name, index): ProgressStep => ({
      name,
      status: index === 0 ? "waiting" : "planned",
    })
  );
  return progressSteps;
}

const router = useRouter();
const companyProgressStore = useCompanyProgressStore();
const onSubmit = handleSubmit((values) => {
  // エラー処理
  const hasError = Object.keys(formErrors.value).length > 0;
  if (hasError) {
    alert("エラーがあります。修正してください。");
    return;
  }

  // 新規データを追加
  const selectedTemplateIndex = parseInt(selectedProgress.value);
  let progressStepNames = [];
  // カスタムの時
  if (selectedTemplateIndex === dummyTemplates.length) {
    progressStepNames = custom.value.progress;
  } else {
    progressStepNames = dummyTemplates[selectedTemplateIndex].progress;
  }

  const progressSteps = createInitialProgressSteps(progressStepNames);
  const now = new Date();
  companyProgressStore.progressList.push({
    id: nanoid(),
    companyName: values.companyName,
    progressSteps,
    createdAt: now,
    updatedAt: now,
  });

  // ホームへ戻る
  router.push("/");
});

const isSelectedTemplate = computed(() => {
  return function (selectedProgress: string, index: number) {
    // TODO: ===に変える
    return selectedProgress == index.toString();
  };
});

// modalへの参照
const refModalProgressCustom = ref<null | InstanceType<
  typeof ModalProgressCustom
>>(null);
const onEditCustomClick = async () => {
  const copy = [...custom.value.progress];
  const newProgress = await refModalProgressCustom.value?.open(copy);
  if (!newProgress) {
    throw new Error("error");
  }
  custom.value.progress = newProgress;
};
</script>

<template>
  <main class="h-full w-full absolute flex justify-center items-center">
    <div>
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col gap-y-4">
          <fieldset>
            <label for="companyName" class="block"
              >会社名を入力してください。</label
            >
            <TextInput placeholder="会社名" class="mt-2" name="companyName" />
          </fieldset>

          <fieldset class="mt-8">
            <label class="block">選考方法を選択してください。</label>

            <div
              v-for="(template, i) in dummyTemplates"
              :key="template.name"
              class="mb-4"
            >
              <input
                type="radio"
                :value="i"
                :name="'template' + i"
                :id="'template' + i"
                v-model="selectedProgress"
              />
              <label :for="'template' + i">{{ template.name }}</label>
              <div
                class="p-1"
                :class="{
                  'selected-template': isSelectedTemplate(selectedProgress, i),
                  'normal-template': !isSelectedTemplate(selectedProgress, i),
                }"
              >
                <div>
                  <span v-for="(progressNams, j) in template.progress" :key="j"
                    >{{ progressNams }} >
                  </span>
                  <span>内定</span>
                </div>
              </div>
            </div>
            <div>
              <input
                type="radio"
                :value="dummyTemplates.length"
                name="custom"
                id="custom"
                v-model="selectedProgress"
              />
              <label for="custom">{{ custom.name }}</label>
              <button @click="onEditCustomClick" class="border p-1 rounded-xl">
                編集
              </button>
              <ModalProgressCustom ref="refModalProgressCustom" />
              <div
                class="p-1"
                :class="{
                  'selected-template': isSelectedTemplate(
                    selectedProgress,
                    dummyTemplates.length
                  ),
                  'normal-template': !isSelectedTemplate(
                    selectedProgress,
                    dummyTemplates.length
                  ),
                }"
              >
                <div>
                  <span
                    v-for="(progressNams, j) in custom.progress"
                    :key="'custom' + j"
                    >{{ progressNams }} >
                  </span>
                  <span>内定</span>
                </div>
              </div>
            </div>
          </fieldset>

          <div class="mt-8 flex justify-end">
            <button type="submit" class="border rounded-xl p-2 mr-4">
              追加
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.selected-template {
  @apply border-purple-400 border-4 rounded-xl;
}
.normal-template {
  @apply border-gray-400 border-4 rounded-xl;
}
</style>
