import React, { useState, useMemo } from "react";
import styles from "./App.module.css";
import { ExperimentData } from "./types";
import FileUpload from "./components/FileUpload/FileUpload";
import { ExperimentSelector } from "./components/ExperimentSelector/ExperimentSelector";
import DataVisualization from "./components/DataVisualization/DataVisualization";

const App: React.FC = () => {
  const [data, setData] = useState<ExperimentData[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [selectedExperiments, setSelectedExperiments] = useState<Set<string>>(
    new Set()
  );

  const experiments = useMemo(() => {
    const experimentIds = Array.from(new Set(data.map((d) => d.experiment_id)));
    return experimentIds.sort();
  }, [data]);

  const resetData = () => {
    setData([]);
    setFileName("");
    setSelectedExperiments(new Set());
  };

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

  const filteredData = useMemo(() => {
    return data.filter((row) => selectedExperiments.has(row.experiment_id));
  }, [data, selectedExperiments]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>MLOps Experiment Tracker</h1>
        <p>A simple tool for tracking ML experiments</p>
      </header>

      <main className={styles.main}>
        {data.length === 0 ? (
          <FileUpload
            onDataLoaded={setData}
            onFileSet={setFileName}
            onExperimentsSelected={setSelectedExperiments}
          />
        ) : (
          <div className="data-section">
            <div className="data-header">
              <h2>Loaded: {fileName}</h2>
              <button onClick={resetData} className="reset-btn">
                Upload New File
              </button>
            </div>

            <div className="content-grid">
              <ExperimentSelector
                allExperiments={experiments}
                selectedExperiments={selectedExperiments}
                toggleExperiment={toggleExperiment}
                selectExperiments={setSelectedExperiments}
              />

              <div className="main-content">
                <div className="data-summary">
                  <div className="summary-item">
                    <span className="summary-label">Total experiments:</span>
                    <span className="summary-value">{experiments.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Selected experiments:</span>
                    <span className="summary-value">
                      {selectedExperiments.size}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">
                      Data points (selected):
                    </span>
                    <span className="summary-value">{filteredData.length}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Unique metrics:</span>
                    <span className="summary-value">
                      {
                        Array.from(
                          new Set(filteredData.map((d) => d.metric_name))
                        ).length
                      }
                    </span>
                  </div>
                </div>

                <DataVisualization filteredData={filteredData} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
