import type { ProgressStepStatus } from "./../types/types";
import type { Progress } from "@/types/types";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCompanyProgressStore = defineStore("company-progress-store", {
  state: () => {
    const progressList = useLocalStorage<Progress[]>(
      "local-storage-progress-list",
      () => []
    );
    return {
      progressList,
    };
  },

  actions: {
    deleteProgress(id: string) {
      this.progressList = this.progressList.filter((p) => p.id !== id);
    },

    /**
     *
     * @param id 選考のID(progress.id)
     * @param stepInfo 更新する選考ステップの情報
     */
    updateProgressStepStatus(
      id: string,
      stepInfo: { stepIndex: number; status: ProgressStepStatus }
    ) {
      const progressList = this.progressList.filter((p) => p.id === id);
      if (progressList.length === 0) {
        throw new Error("対象IDのものが見つかりませんでした。");
      }
      if (progressList.length > 1) {
        throw new Error("ID重複があります");
      }

      // 対象の状態を更新する
      const progress = progressList[0];
      progress.progressSteps[stepInfo.stepIndex].status = stepInfo.status;

      // 対象の状態が変わったので、それ以降の状態も更新する
      if (stepInfo.status === "passed") {
        // 次の選考ステップは、'waiting'、それ以降は'planned'に設定する
        progress.progressSteps[stepInfo.stepIndex + 1].status = "waiting";

        for (
          let i = stepInfo.stepIndex + 1;
          i < progress.progressSteps.length;
          i++
        ) {
          if (i === stepInfo.stepIndex + 1) {
            progress.progressSteps[i].status = "waiting";
          } else {
            progress.progressSteps[i].status = "planned";
          }
        }
      } else if (stepInfo.status === "failed") {
        // 後ろの選考ステップはすべて'canceled'状態にする
        for (
          let i = stepInfo.stepIndex + 1;
          i < progress.progressSteps.length;
          i++
        ) {
          progress.progressSteps[i].status = "canceled";
        }
      }

      const now = new Date();
      progress.updatedAt = now;
    },
  },
});
