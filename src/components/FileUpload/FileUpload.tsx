import Papa from "papaparse";
import { ExperimentData } from "../../types";
import styles from "./FileUpload.module.css";
import { useState } from "react";

interface FileUploadProps {
  onDataLoaded: (data: ExperimentData[]) => void;
  onFileSet: (fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded, onFileSet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      onFileSet(file.name);

      Papa.parse<ExperimentData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setIsLoading(false);
          const parsedData = result.data.map((row) => ({
            experiment_id: row.experiment_id,
            metric_name: row.metric_name,
            step: Number(row.step),
            value: Number(row.value),
          }));
          onDataLoaded(parsedData);
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
        },
      });
    }
  };

  return (
    <div className={styles.uploadArea}>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2>Upload Your Data</h2>
          <p>Select a CSV file with your experiment data</p>
          <label className={styles.label}>
            <span className={styles.button}>Upload CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className={styles.input}
            />
          </label>
          <div className={styles.notice}>
            <h4>Expected format:</h4>
            <code>experiment_id, metric_name, step, value</code>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
