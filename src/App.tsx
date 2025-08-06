import React, { useState } from "react";
import styles from "./App.module.css";
import { ExperimentData } from "./types";
import FileUpload from "./components/FileUpload/FileUpload";
import ExperimentInspector from "./components/ExperimentInspector/ExperimentInspector";

const App: React.FC = () => {
  const [experiments, setData] = useState<ExperimentData[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const resetData = () => {
    setData([]);
    setFileName("");
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>MLOps Experiment Tracker</h1>
        <p>A simple tool for tracking ML experiments</p>
      </header>

      <main className={styles.main}>
        {experiments.length === 0 ? (
          <FileUpload onDataLoaded={setData} onFileSet={setFileName} />
        ) : (
          <ExperimentInspector
            fileName={fileName}
            experiments={experiments}
            resetData={resetData}
          />
        )}
      </main>
    </div>
  );
};

export default App;
