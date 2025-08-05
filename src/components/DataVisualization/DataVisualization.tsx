import { ExperimentData } from "../../types";
import styles from "./DataVisualization.module.css";

interface DataVisualizationProps {
  filteredData: ExperimentData[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  filteredData,
}) => {
  return (
    <div className={styles.container}>
      <h3>Sample Data (Selected Experiments)</h3>
      {filteredData.length > 0 ? (
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
              {filteredData.slice(0, 10).map((row, index) => (
                <tr key={index}>
                  <td>{row.experiment_id}</td>
                  <td>{row.metric_name}</td>
                  <td>{row.step}</td>
                  <td>{row.value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length > 10 && (
            <p className={styles.note}>
              Showing first 10 rows of {filteredData.length} total
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

export default DataVisualization;
