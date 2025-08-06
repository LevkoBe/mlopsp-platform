import { useMemo, useState } from "react";
import styles from "./ExperimentInspector.module.css";
import { ExperimentData } from "../../types";
import ExperimentSelector from "./SelectionList/ExperimentSelector";
import MetricFilter from "./SelectionList/MetricFilter";
import ExperimentsSummary from "./ExperimentsSummary/ExperimentsSummary";
import ExperimentsVisualization from "./ExperimentsVisualization/ExperimentsVisualization";

interface ExperimentInspectorProps {
  fileName: string;
  experiments: ExperimentData[];
  resetData: () => void;
}

const ExperimentInspector: React.FC<ExperimentInspectorProps> = ({
  fileName,
  experiments,
  resetData,
}) => {
  const [selectedExperiments, setSelectedExperiments] = useState<Set<string>>(
    new Set(
      experiments.length > 0 ? experiments.map((e) => e.experiment_id) : []
    )
  );

  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(
    new Set(experiments.length > 0 ? experiments.map((e) => e.metric_name) : [])
  );

  const allExperiments = useMemo(() => {
    const experimentIds = Array.from(
      new Set(experiments.map((d) => d.experiment_id))
    );
    return experimentIds.sort();
  }, [experiments]);

  const allMetrics = useMemo(() => {
    const metricNames = Array.from(
      new Set(experiments.map((d) => d.metric_name))
    );
    return metricNames.sort();
  }, [experiments]);

  const filteredExperiments = useMemo(() => {
    return experiments.filter(
      (row) =>
        selectedExperiments.has(row.experiment_id) &&
        selectedMetrics.has(row.metric_name)
    );
  }, [experiments, selectedExperiments, selectedMetrics]);

  const toggleExperiment = (experimentId: string) => {
    setSelectedExperiments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(experimentId)) {
        newSet.delete(experimentId);
      } else {
        newSet.add(experimentId);
      }
      return newSet;
    });
  };

  const toggleMetric = (metricName: string) => {
    setSelectedMetrics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(metricName)) {
        newSet.delete(metricName);
      } else {
        newSet.add(metricName);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.inspector}>
      <div className={styles.header}>
        <h2>Loaded: {fileName}</h2>
        <button onClick={resetData} className={styles.resetBtn}>
          Upload New File
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.select}>
          <ExperimentSelector
            all={allExperiments}
            selected={selectedExperiments}
            toggle={toggleExperiment}
            select={setSelectedExperiments}
          />

          <MetricFilter
            all={allMetrics}
            selected={selectedMetrics}
            toggle={toggleMetric}
            select={setSelectedMetrics}
          />
        </div>

        <div className={styles.present}>
          <ExperimentsSummary
            all={allExperiments}
            selected={selectedExperiments}
            filtered={filteredExperiments}
          />

          <ExperimentsVisualization filtered={filteredExperiments} />
        </div>
      </div>
    </div>
  );
};

export default ExperimentInspector;
