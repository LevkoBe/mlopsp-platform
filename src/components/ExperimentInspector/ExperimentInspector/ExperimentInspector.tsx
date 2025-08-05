import { useMemo, useState } from "react";
import ExperimentSelector from "../../ExperimentSelector/ExperimentSelector";
import ExperimentsSummary from "../../ExperimentsSummary/ExperimentsSummary";
import ExperimentsVisualization from "../../ExperimentsVisualization/ExperimentsVisualization";
import styles from "./ExperimentInspector.module.css";
import { ExperimentData } from "../../../types";

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
  const allExperiments = useMemo(() => {
    const experimentIds = Array.from(
      new Set(experiments.map((d) => d.experiment_id))
    );
    return experimentIds.sort();
  }, [experiments]);

  const filteredExperiments = useMemo(() => {
    return experiments.filter((row) =>
      selectedExperiments.has(row.experiment_id)
    );
  }, [experiments, selectedExperiments]);

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
