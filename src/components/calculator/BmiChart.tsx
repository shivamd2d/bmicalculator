import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

interface BmiChartProps {
  userBmi: number;
}

const chartData = [
  { name: 'Underweight', min: 0, max: 18.5, val: 18.5, color: '#3b82f6' },
  { name: 'Normal', min: 18.5, max: 24.9, val: 24.9, color: '#22c55e' },
  { name: 'Overweight', min: 25.0, max: 29.9, val: 29.9, color: '#eab308' },
  { name: 'Obese I', min: 30.0, max: 34.9, val: 34.9, color: '#f97316' },
  { name: 'Obese II', min: 35.0, max: 39.9, val: 39.9, color: '#ef4444' },
  { name: 'Obese III', min: 40.0, max: 50.0, val: 50.0, color: '#991b1b' },
];

export const BmiChart: React.FC<BmiChartProps> = ({ userBmi }) => {
  return (
    <div className="w-full h-64 sm:h-72 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#64748b' }}
            interval={0}
          />
          <YAxis
            domain={[0, 45]}
            ticks={[18.5, 25, 30, 35, 40]}
            tick={{ fontSize: 11, fill: '#64748b' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-slate-300">BMI Threshold: {data.val}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={userBmi}
            stroke="#6366f1"
            strokeWidth={3}
            strokeDasharray="4 4"
            label={{
              value: `You (${userBmi.toFixed(1)})`,
              fill: '#6366f1',
              fontSize: 12,
              fontWeight: 700,
              position: 'top'
            }}
          />
          <Bar dataKey="val" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                opacity={
                  (userBmi < 18.5 && index === 0) ||
                  (userBmi >= 18.5 && userBmi < 25 && index === 1) ||
                  (userBmi >= 25 && userBmi < 30 && index === 2) ||
                  (userBmi >= 30 && userBmi < 35 && index === 3) ||
                  (userBmi >= 35 && userBmi < 40 && index === 4) ||
                  (userBmi >= 40 && index === 5)
                    ? 1
                    : 0.45
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
