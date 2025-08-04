import React, { useState, useMemo } from "react";
import Papa from "papaparse";
import "./App.css";
import { ExperimentData } from "./types";

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      Papa.parse<ExperimentData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            experiment_id: row.experiment_id,
            metric_name: row.metric_name,
            step: Number(row.step),
            value: Number(row.value),
          }));
          setData(parsedData);

          const firstExperiment = Array.from(
            new Set(parsedData.map((d) => d.experiment_id))
          )[0];
          if (firstExperiment) {
            setSelectedExperiments(new Set([firstExperiment]));
          }
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
        },
      });
    }
  };

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

  const selectAllExperiments = () => {
    setSelectedExperiments(new Set(experiments));
  };

  const clearAllExperiments = () => {
    setSelectedExperiments(new Set());
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => selectedExperiments.has(row.experiment_id));
  }, [data, selectedExperiments]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MLOps Experiment Tracker</h1>
        <p>A simple tool for tracking ML experiments</p>
      </header>

      <main className="app-main">
        {data.length === 0 ? (
          <div className="upload-section">
            <div className="upload-area">
              <h2>Upload Your Data</h2>
              <p>Select a CSV file with your experiment data</p>
              <label className="file-input-label">
                <span className="file-button">Upload CSV</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="file-input"
                />
              </label>
              <div className="format-info">
                <h4>Expected format:</h4>
                <code>experiment_id, metric_name, step, value</code>
              </div>
            </div>
          </div>
        ) : (
          <div className="data-section">
            <div className="data-header">
              <h2>Loaded: {fileName}</h2>
              <button onClick={resetData} className="reset-btn">
                Upload New File
              </button>
            </div>

            <div className="content-grid">
              <div className="experiment-panel">
                <div className="panel-header">
                  <h3>Experiments ({selectedExperiments.size} selected)</h3>
                  <div className="panel-controls">
                    <button
                      onClick={selectAllExperiments}
                      className="control-btn select-all"
                    >
                      All
                    </button>
                    <button
                      onClick={clearAllExperiments}
                      className="control-btn clear-all"
                    >
                      None
                    </button>
                  </div>
                </div>

                <div className="experiment-list">
                  {experiments.map((experimentId) => (
                    <div
                      key={experimentId}
                      className={`experiment-item ${
                        selectedExperiments.has(experimentId) ? "selected" : ""
                      }`}
                      onClick={() => toggleExperiment(experimentId)}
                    >
                      <span className="experiment-name">{experimentId}</span>
                      <span className="experiment-indicator">
                        {selectedExperiments.has(experimentId) ? "✓" : "○"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

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

                <div className="data-table">
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
                        <p className="table-note">
                          Showing first 10 rows of {filteredData.length} total
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="no-data">
                      <p>
                        No experiments selected. Choose experiments from the
                        left panel.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
