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
  const [isDragging, setIsDragging] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleFileUpload = (file: File) => {
    setIsLoading(true);
    if (!file) return;

    onFileSet(file.name);

    Papa.parse<ExperimentData>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setIsLoading(false);
        const data = result.data as ExperimentData[];

        const validData = data
          .filter(
            (row) =>
              row.experiment_id &&
              row.metric_name &&
              !isNaN(Number(row.step)) &&
              !isNaN(Number(row.value))
          )
          .map((row) => ({
            experiment_id: row.experiment_id.trim(),
            metric_name: row.metric_name.trim(),
            step: Number(row.step),
            value: Number(row.value),
          }));

        if (validData.length === 0) {
          setErrorOccurred(true);
          return;
        }

        onDataLoaded(validData);
        setErrorOccurred(false);
      },
      error: (error) => {
        setErrorOccurred(true);
        console.error("CSV parsing error:", error);
        setIsLoading(false);
      },
      transform: (value: string, header: string) => {
        if (header === "step") return parseInt(value) || 0;
        if (header === "value") return parseFloat(value) || 0;
        return value.trim();
      },
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    else setErrorOccurred(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files).find(
      (f) => f.type === "text/csv" || f.name.endsWith(".csv")
    );
    if (file) handleFileUpload(file);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.items).find(
      (f) => f.type === "text/csv" && f.kind === "file"
    );
    setErrorOccurred(!file);
    setIsDragging(true);
  };

  return (
    <div
      className={`${styles.uploadArea} ${isDragging ? styles.dragging : ""} ${
        errorOccurred ? styles.error : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
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
              onChange={handleFileSelect}
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
