<script lang="ts" setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    id?: string;
    placeholder?: string;
  }>(),
  {
    placeholder: "",
    id: undefined,
  }
);

const { value, errorMessage, errors } = useField(toRef(props, "name"));
</script>

<template>
  <div>
    <input
      type="text"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      v-model="value"
      class="border border-gray-200 bg-gray-800 p-2 rounded-xl text-gray-200"
      :class="errors.length > 0 ? 'border-red-400' : ''"
    />
    <template v-if="errors.length > 0">
      <span class="block text-sm mt-2 text-red-400">{{ errorMessage }}</span>
    </template>
  </div>
</template>
