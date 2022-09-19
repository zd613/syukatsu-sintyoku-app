<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    name?: string;
    id?: string;
    placeholder?: string;
  }>(),
  {
    placeholder: "",
    name: undefined,
    id: undefined,
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", newValue: string): void;
}>();

const internalValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <input
    type="text"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    v-model="internalValue"
    class="border border-gray-200 bg-gray-800 p-2 rounded-xl text-gray-200"
  />
</template>
