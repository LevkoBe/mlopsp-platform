# **MLOps Experiment Tracker**

Frontend application to upload, inspect, and compare machine learning experiment logs.

**Live Demo:** https://levkobe.github.io/mlopsp-platform/

## **Features**

- **CSV Upload:** Easily upload experiment data with a simple drag-and-drop or file selection.
- **Experiment & Metric Selection:** Interactively select and deselect experiments and metrics to compare.
- **Dynamic Visualizations:** View line charts for all tracked metrics for the selected experiments.
- **Data Table View:** Inspect the raw data in a table.
- **Chart Export:** Download charts as PNG or SVG for your reports.

## **How to Use**

1. **Upload Data:** Drag and drop your CSV file or click the "Upload CSV" button. The CSV must contain the columns: `experiment_id`, `metric_name`, `step`, and `value`.
2. **Select Experiments:** On the left panel, choose the experiments you want to visualize.
3. **Filter Metrics:** Select the specific metrics you are interested in.
4. **Analyze:** View the generated charts and data table to compare your experiment results.

## **Tech Stack**

- **Framework:** React
- **Language:** TypeScript
- **Charting:** Recharts
- **CSV Parsing:** Papa Parse
- **Chart Export:** html-to-image
- **Styling:** CSS Modules
