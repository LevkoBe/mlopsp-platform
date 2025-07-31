export interface ExperimentData {
  experiment_id: string;
  metric_name: string;
  step: number;
  value: number;
}

export interface ProcessedExperiment {
  id: string;
  metricCount: number;
  maxStep: number;
  metrics: string[];
}

export interface ChartDataPoint {
  step: number;
  [key: string]: number; // some_experiment_id: some_value
}

export interface UploadStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}
