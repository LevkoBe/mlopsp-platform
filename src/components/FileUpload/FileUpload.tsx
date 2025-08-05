import Papa from "papaparse";
import { ExperimentData } from "../../types";
import "./FileUpload.css";

interface FileUploadProps {
  onDataLoaded: (data: ExperimentData[]) => void;
  onFileSet: (fileName: string) => void;
  onExperimentsSelected: (experiments: Set<string>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onDataLoaded,
  onFileSet,
  onExperimentsSelected,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSet(file.name);

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
          onDataLoaded(parsedData);

          const firstExperiment = Array.from(
            new Set(parsedData.map((d) => d.experiment_id))
          )[0];
          if (firstExperiment) {
            onExperimentsSelected(new Set([firstExperiment]));
          }
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
        },
      });
    }
  };

  return (
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
  );
};

export default FileUpload;
