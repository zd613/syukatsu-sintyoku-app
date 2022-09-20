<script setup lang="ts">
import { useCompanyProgressStore } from "@/stores/project";
import { ref } from "vue";
import { useRouter } from "vue-router";
import TextInput from "../components/TextInput.vue";
import type { ProgressStep } from "@/types/types";
import { useForm } from "vee-validate";
// TODO: tree shaking
import * as yup from "yup";

const formSchema = {
  companyName: yup.string().required("会社名の入力は必須です。"),
};
const { errors: formErrors, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const selectedTemplate = ref("0");

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
  const selectedTemplateIndex = parseInt(selectedTemplate.value);
  const progressStepNames = dummyTemplates[selectedTemplateIndex].progress;
  const progressSteps = createInitialProgressSteps(progressStepNames);
  companyProgressStore.progressList.push({
    companyName: values.companyName,
    progressSteps,
  });

  // ホームへ戻る
  router.push("/");
});
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
                v-model="selectedTemplate"
              />
              <label :for="'template' + i">{{ template.name }}</label>
              <div class="pt-1">
                <span v-for="(progressNams, j) in template.progress" :key="j"
                  >{{ progressNams }} >
                </span>
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
