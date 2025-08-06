import React, { useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./Charts.module.css";
import { toPng, toSvg } from "html-to-image";

interface ChartsProps {
  chartData: Record<string, any[]>;
  metrics: string[];
  experiments: string[];
  chartHeight?: number;
  margin?: { top?: number; right?: number; left?: number; bottom?: number };
  generateColor?: (index: number) => string;
}

const defaultColorGenerator = (index: number, shift = 30) => {
  const hue = (shift + index * 137.5) % 360;
  return `hsl(${hue}, 65%, 50%)`;
};

const Charts: React.FC<ChartsProps> = ({
  chartData,
  metrics,
  experiments,
  chartHeight = 300,
  margin = { top: 20, right: 0, left: 0, bottom: 20 },
  generateColor = defaultColorGenerator,
}) => {
  const chartRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const downloadChart = useCallback(
    async (format: "png" | "svg", metric: string) => {
      const node = chartRefs.current[metric];
      if (!node) {
        console.error("Chart element not found for metric:", metric);
        return;
      }

      try {
        const options = {
          backgroundColor: getComputedStyle(node).backgroundColor,
        };

        const dataUrl =
          format === "png"
            ? await toPng(node, options)
            : await toSvg(node, options);

        const link = document.createElement("a");
        link.download = `${metric}-chart.${format}`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to export chart:", err);
      }
    },
    []
  );

  return (
    <div className={styles.container}>
      {metrics.map((metric) => {
        const extraHeight = Math.ceil(experiments.length / 5) * 25;
        const maxAllowedHeight = 600;
        const dynamicHeight = Math.min(
          chartHeight + extraHeight,
          maxAllowedHeight
        );

        return (
          <div
            key={metric}
            className={styles.wrapper}
            ref={(el) => (chartRefs.current[metric] = el)}
          >
            <div className={styles.header}>
              <h4 className={styles.title}>{metric}</h4>
              <div className={styles.downloadControls}>
                <button
                  onClick={() => downloadChart("png", metric)}
                  className={styles.downloadButton}
                >
                  PNG
                </button>
                <button
                  onClick={() => downloadChart("svg", metric)}
                  className={styles.downloadButton}
                >
                  SVG
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={dynamicHeight}>
              <LineChart data={chartData[metric]} margin={margin}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--accent-bg, #394a46)"
                />
                <XAxis
                  dataKey="step"
                  stroke="var(--secondary-fg, #6ba397)"
                  fontSize={12}
                />
                <YAxis stroke="var(--secondary-fg, #6ba397)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--primary-bg, #212827)",
                    border: "1px solid var(--accent-bg, #394a46)",
                    borderRadius: "var(--border-radius, 8px)",
                    color: "var(--primary-fg, #ffffff)",
                  }}
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    maxHeight: 80,
                    overflowY: "auto",
                    paddingTop: "10px",
                  }}
                />
                {experiments.map((experiment, index) => (
                  <Line
                    key={experiment}
                    type="monotone"
                    dataKey={experiment}
                    stroke={generateColor(index)}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default Charts;
