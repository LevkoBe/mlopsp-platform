import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { ExperimentData } from "./types";

const App: React.FC = () => {
  const [data, setData] = useState<ExperimentData[]>([]);
  const [fileName, setFileName] = useState<string>("");

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
  };

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

            <div className="data-summary">
              <p>Total data points: {data.length}</p>
              <p>
                Experiments:{" "}
                {Array.from(new Set(data.map((d) => d.experiment_id))).length}
              </p>
              <p>
                Metrics:{" "}
                {Array.from(new Set(data.map((d) => d.metric_name))).length}
              </p>
            </div>

            <div className="data-table">
              <h3>Sample Data</h3>
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
                  {data.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      <td>{row.experiment_id}</td>
                      <td>{row.metric_name}</td>
                      <td>{row.step}</td>
                      <td>{row.value.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length < 10 && (
                <p className="table-note">
                  Showing first 10 rows of {data.length} total
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
