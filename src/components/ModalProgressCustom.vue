<script setup lang="ts">
import { ref } from "vue";
import IconTrash from "./icons/IconTrash.vue";
import IconPlus from "./icons/IconPlus.vue";
import IconPencilSquare from "./icons/IconPencilSquare.vue";
import IconCheckCircle from "./icons/IconCheckCircle.vue";

const visible = ref(false);
const promiseInfo = ref({
  resolve: null as null | ((defaultStepNames: string[]) => string[]),
});

const progressStepNames = ref<string[]>([]);
const editIndex = ref(-1);

// コンポーネント外から呼び出す
// modalを開く
const open = (defaultStepNames: string[]): Promise<string[]> => {
  visible.value = true;
  console.log(defaultStepNames);
  progressStepNames.value = defaultStepNames;
  return new Promise((resolve) => {
    promiseInfo.value.resolve = resolve as any;
  });
};

defineExpose({
  open,
});

const isEditing = (index: number) => {
  return index === editIndex.value;
};

const onAddButtonClick = (index: number) => {
  // indexは0が一番最初の選考状況の前に挿入。
  // 1以降が i-1番目の選考状況の後ろに挿入するボタンをクリック時

  progressStepNames.value.splice(index, 0, "新規");
};

const onDeleteButtonClick = (index: number) => {
  progressStepNames.value.splice(index, 1);
};

const onEditButtonClick = (index: number) => {
  console.log("edit", index);
  editIndex.value = index;
};
const onEditDoneClick = (index: number) => {
  editIndex.value = -1;
};

const onOkClick = () => {
  visible.value = false;
  promiseInfo.value.resolve?.(progressStepNames.value);
};

const onCancelClick = () => {
  visible.value = false;
  // 特に使わないのでから配列を返す
  promiseInfo.value.resolve?.([]);
};
</script>

<template>
  <div v-if="visible" class="z-50 p-4 absolute top-0 left-0 w-full h-full">
    <div
      class="w-full h-full border flex flex-col border-purple-400 bg-gray-700 rounded-xl"
    >
      <div class="flex-grow p-3 overflow-y-auto">
        <div>
          <button class="ml-4 btn-add" @click="onAddButtonClick(0)">
            <IconPlus class="w-6 h-6" />
          </button>
        </div>
        <div v-for="(name, i) in progressStepNames" :key="i">
          <div class="flex items-center">
            <input
              type="text"
              class="text-2xl text-gray-800 rounded-md p-1"
              v-model="progressStepNames[i]"
              v-if="i === editIndex"
            />
            <span class="text-2xl" v-else>{{ name }}</span>

            <div class="flex flex-col ml-4">
              <template v-if="isEditing(i)">
                <button type="button" @click="onEditDoneClick(i)">
                  <IconCheckCircle class="w-8 h-8" /></button
              ></template>
              <template v-else>
                <button type="button" @click="onDeleteButtonClick(i)">
                  <IconTrash class="w-6 h-6" />
                </button>
                <button type="button" @click="onEditButtonClick(i)">
                  <IconPencilSquare class="w-6 h-6" />
                </button>
              </template>
            </div>
          </div>
          <div class="flex my-2">
            <div>↓</div>
            <button
              class="ml-4 btn-add"
              @click="onAddButtonClick(i + 1 /* 注意: i+1 (1スタート)*/)"
            >
              <IconPlus class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div>内定</div>
      </div>
      <div class="grid grid-cols-2 p-4">
        <button type="button" @click="onCancelClick">キャンセル</button>
        <button type="button" @click="onOkClick">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-add {
  @apply rounded-full bg-green-700;
}
</style>
