import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color: string;
  height?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, color, height = 50 }) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div
      className='w-full'
      style={{ height }}>
      <ResponsiveContainer
        width='100%'
        height='100%'>
        <LineChart data={chartData}>
          <Line
            type='monotone'
            dataKey='value'
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;
