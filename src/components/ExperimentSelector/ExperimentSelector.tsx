import "./ExperimentSelector.css";

interface ExperimentSelectorProps {
  allExperiments: string[];
  selectedExperiments: Set<string>;
  toggleExperiment: (experimentId: string) => void;
  selectExperiments: (experimentIds: Set<string>) => void;
}

export const ExperimentSelector: React.FC<ExperimentSelectorProps> = ({
  allExperiments,
  selectedExperiments,
  toggleExperiment,
  selectExperiments,
}) => {
  return (
    <div className="experiment-panel">
      <div className="panel-header">
        <h3>Experiments ({selectedExperiments.size} selected)</h3>
        <div className="panel-controls">
          <button
            onClick={() => selectExperiments(new Set(allExperiments))}
            className="control-btn select-all"
          >
            All
          </button>
          <button
            onClick={() => selectExperiments(new Set())}
            className="control-btn clear-all"
          >
            None
          </button>
        </div>
      </div>

      <div className="experiment-list">
        {allExperiments.map((experimentId) => (
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
  );
};
