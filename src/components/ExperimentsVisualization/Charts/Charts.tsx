import React from "react";
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
  margin = { top: 20, right: 30, left: 20, bottom: 20 },
  generateColor = defaultColorGenerator,
}) => {
  return (
    <div className={styles.chartsContainer}>
      {metrics.map((metric) => (
        <div key={metric} className={styles.chartWrapper}>
          <h4 className={styles.chartTitle}>{metric}</h4>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={chartData[metric]} margin={margin}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--accent-bg)" />
              <XAxis
                dataKey="step"
                stroke="var(--secondary-fg)"
                fontSize={12}
              />
              <YAxis stroke="var(--secondary-fg)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--primary-bg)",
                  border: "1px solid var(--accent-bg)",
                  borderRadius: "var(--border-radius)",
                  color: "var(--primary-fg)",
                }}
              />
              <Legend />
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
      ))}
    </div>
  );
};

export default Charts;
