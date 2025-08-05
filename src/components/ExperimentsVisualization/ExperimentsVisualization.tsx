import { ExperimentData } from "../../types";
import styles from "./ExperimentsVisualization.module.css";

interface ExperimentsVisualizationProps {
  filtered: ExperimentData[];
}

const ExperimentsVisualization: React.FC<ExperimentsVisualizationProps> = ({
  filtered,
}) => {
  return (
    <div className={styles.container}>
      <h3>Sample Data (Selected Experiments)</h3>
      {filtered.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Experiment ID</th>
                <th>Metric</th>
                <th>Step</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 10).map((row, index) => (
                <tr key={index}>
                  <td>{row.experiment_id}</td>
                  <td>{row.metric_name}</td>
                  <td>{row.step}</td>
                  <td>{row.value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 10 && (
            <p className={styles.notice}>
              Showing first 10 rows of {filtered.length} total
            </p>
          )}
        </>
      ) : (
        <div className={styles.notice}>
          <p>
            No experiments selected. Choose experiments from the left panel.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExperimentsVisualization;
