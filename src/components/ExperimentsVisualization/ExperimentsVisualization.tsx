import React, { useMemo, useState } from "react";
import { ExperimentData } from "../../types";
import styles from "./ExperimentsVisualization.module.css";
import Charts from "./Charts/Charts";
import Table from "./Table/Table";

interface ExperimentsVisualizationProps {
  filtered: ExperimentData[];
}

const views = [
  { key: "charts" as const, label: "Charts" },
  { key: "table" as const, label: "Table" },
];

const ExperimentsVisualization: React.FC<ExperimentsVisualizationProps> = ({
  filtered,
}) => {
  const [activeView, setActiveView] =
    useState<(typeof views)[number]["key"]>("charts");

  const { chartData, metrics, experiments } = useMemo(() => {
    if (!filtered.length)
      return { chartData: {}, metrics: [], experiments: [] };

    const uniqueMetrics = Array.from(
      new Set(filtered.map((d) => d.metric_name))
    ).sort();

    const uniqueExperiments = Array.from(
      new Set(filtered.map((d) => d.experiment_id))
    ).sort();

    const dataByMetric: Record<string, any[]> = {};

    uniqueMetrics.forEach((metric) => {
      const metricData = filtered.filter((d) => d.metric_name === metric);
      const steps = Array.from(new Set(metricData.map((d) => d.step))).sort(
        (a, b) => a - b
      );

      const chartPoints = steps.map((step) => {
        const point: any = { step };
        uniqueExperiments.forEach((expId) => {
          const dataPoint = metricData.find(
            (d) => d.experiment_id === expId && d.step === step
          );
          point[expId] = dataPoint ? dataPoint.value : null;
        });
        return point;
      });

      dataByMetric[metric] = chartPoints;
    });

    return {
      chartData: dataByMetric,
      metrics: uniqueMetrics,
      experiments: uniqueExperiments,
    };
  }, [filtered]);

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
    charts: (
      <Charts
        chartData={chartData}
        metrics={metrics}
        experiments={experiments}
      />
    ),
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
