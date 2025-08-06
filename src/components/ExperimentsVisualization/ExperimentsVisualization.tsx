import React, { useState } from "react";
import { ExperimentData } from "../../types";
import styles from "./ExperimentsVisualization.module.css";
import Table from "./Table/Table";

interface ExperimentsVisualizationProps {
  filtered: ExperimentData[];
}

const views = [{ key: "table" as const, label: "Table" }];

const ExperimentsVisualization: React.FC<ExperimentsVisualizationProps> = ({
  filtered,
}) => {
  const [activeView, setActiveView] =
    useState<(typeof views)[number]["key"]>("table");

  if (filtered.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.notice}>
          No experiments selected. Choose experiments from the left panel.
        </div>
      </div>
    );
  }

  const viewComponents = {
    table: <Table experiments={filtered} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Visualization ({filtered.length} data points)
        </h3>
        <div className={styles.controls}>
          {views.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`${styles.button} ${
                activeView === key ? styles.activeButton : styles.inactiveButton
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {viewComponents[activeView]}
    </div>
  );
};

export default ExperimentsVisualization;
