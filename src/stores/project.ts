import type { Progress } from "@/types/types";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";

export const useCompanyProgressStore = defineStore("company-progress-store", {
  state: () => {
    // TODO: local storageに変更する
    const progressList = useSessionStorage<Progress[]>(
      "session-storage-progress-list",
      () => []
    );
    return {
      progressList,
    };
  },

  actions: {
    deleteProgress(index: number) {
      this.progressList.splice(index, 1);
    },
  },
});
