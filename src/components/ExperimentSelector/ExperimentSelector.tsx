import styles from "./ExperimentSelector.module.css";

interface ExperimentSelectorProps {
  allExperiments: string[];
  selectedExperiments: Set<string>;
  toggleExperiment: (experimentId: string) => void;
  selectExperiments: (experimentIds: Set<string>) => void;
}

export const ExperimentSelector: React.FC<ExperimentSelectorProps> = ({
  allExperiments,
  selectedExperiments,
  toggleExperiment,
  selectExperiments,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Experiments ({selectedExperiments.size} selected)</h3>
        <div className={styles.controls}>
          <button
            onClick={() => selectExperiments(new Set(allExperiments))}
            className={`${styles.btn} ${styles.selectAll}`}
          >
            All
          </button>
          <button
            onClick={() => selectExperiments(new Set())}
            className={`${styles.btn} ${styles.clearAll}`}
          >
            None
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {allExperiments.map((experimentId) => (
          <div
            key={experimentId}
            className={`${styles.item} ${
              selectedExperiments.has(experimentId) ? styles.selected : ""
            }`}
            onClick={() => toggleExperiment(experimentId)}
          >
            <span className={styles.name}>{experimentId}</span>
            <span className={styles.indicator}>
              {selectedExperiments.has(experimentId) ? "✓" : "○"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
