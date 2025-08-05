import styles from "./ExperimentsSummary.module.css";
import { ExperimentData } from "../../types";

interface ExperimentsSummaryProps {
  all: string[];
  selected: Set<string>;
  filtered: ExperimentData[];
}

const ExperimentsSummary: React.FC<ExperimentsSummaryProps> = ({
  all,
  selected,
  filtered,
}) => {
  return (
    <div className={styles.summary}>
      <div className={styles.item}>
        <span className={styles.label}>Total experiments:</span>
        <span className={styles.value}>{all.length}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Selected experiments:</span>
        <span className={styles.value}>{selected.size}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Data points (selected):</span>
        <span className={styles.value}>{filtered.length}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Unique metrics:</span>
        <span className={styles.value}>
          {Array.from(new Set(filtered.map((d) => d.metric_name))).length}
        </span>
      </div>
    </div>
  );
};

export default ExperimentsSummary;
