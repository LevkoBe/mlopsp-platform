import styles from "./ExperimentSelector.module.css";

interface ExperimentSelectorProps {
  all: string[];
  selected: Set<string>;
  toggle: (experimentId: string) => void;
  select: (experimentIds: Set<string>) => void;
}

const ExperimentSelector: React.FC<ExperimentSelectorProps> = ({
  all,
  selected,
  toggle,
  select,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Experiments ({selected.size} selected)</h3>
        <div className={styles.controls}>
          <button
            onClick={() => select(new Set(all))}
            className={`${styles.btn} ${styles.selectAll}`}
          >
            All
          </button>
          <button
            onClick={() => select(new Set())}
            className={`${styles.btn} ${styles.clearAll}`}
          >
            None
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {all.map((experimentId) => (
          <div
            key={experimentId}
            className={`${styles.item} ${
              selected.has(experimentId) ? styles.selected : ""
            }`}
            onClick={() => toggle(experimentId)}
          >
            <span className={styles.name}>{experimentId}</span>
            <span className={styles.indicator}>
              {selected.has(experimentId) ? "✓" : "○"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentSelector;
