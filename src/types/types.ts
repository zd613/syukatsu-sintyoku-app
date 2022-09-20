/**
 * 進み具合
 */
export type ProgressStepStatus =
  | "waiting"
  | "planned"
  | "passed"
  | "failed"
  | "canceled";

// 1つのステップ
export type ProgressStep = {
  // step名 (e.g. 書類審査)
  name: string;

  // waiting, ok, ng
  status: ProgressStepStatus;
};

//選考
// TODO: 名前考える
export type Progress = {
  companyName: string;
  progressSteps: ProgressStep[];
};
