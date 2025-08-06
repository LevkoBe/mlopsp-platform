import React from "react";
import styles from "./Table.module.css";
import { ExperimentData } from "../../../types";

interface TableProps {
  experiments: ExperimentData[];
}

const Table: React.FC<TableProps> = ({ experiments }) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Experiment ID</th>
            <th className={styles.th}>Metric</th>
            <th className={styles.th}>Step</th>
            <th className={styles.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {experiments.slice(0, 100).map((row, index) => (
            <tr key={index}>
              <td className={styles.td}>{row.experiment_id}</td>
              <td className={styles.td}>{row.metric_name}</td>
              <td className={styles.td}>{row.step}</td>
              <td className={styles.td}>{row.value.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {experiments.length > 100 && (
        <div className={styles.tableNotice}>
          Showing first 100 rows of {experiments.length} total
        </div>
      )}
    </>
  );
};

export default Table;
