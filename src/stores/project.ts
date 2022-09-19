import type { Progress } from "@/types/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanyProgressStore = defineStore("company-progress-store", {
  state: () => {
    const progressList = ref<Progress[]>([]);
    return {
      progressList,
    };
  },
});
