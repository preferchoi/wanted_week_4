import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import mock_data from './assets/mock_data.json';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export const chartLabels = Object.keys(mock_data?.response);
export const chartDataBar = Object.values(mock_data?.response).map(entry => entry.value_bar);
export const chartDataArea = Object.values(mock_data?.response).map(entry => entry.value_area);

export const options = {
  responsive: true,
  scales: {
    y1: { // 첫 번째 Y축
      type: 'linear',
      position: 'left',
      id: 'y1',
      max: 200,
    },
    y2: { // 두 번째 Y축
      type: 'linear',
      position: 'right',
      id: 'y2',
    },
  },
};

export const data = {
  labels:chartLabels,
  datasets: [
    {
      type: 'line',
      label: 'chartDataArea',
      borderColor: 'rgb(255, 99, 132, 0.5)',
      borderWidth: 2,
      fill: true,
      data: chartDataArea,
      yAxisID: 'y1',
    },
    {
      type: 'bar',
      label: 'chartDataBar',
      backgroundColor: 'rgb(75, 192, 192)',
      data: chartDataBar,
      borderColor: 'white',
      borderWidth: 2,
      yAxisID: 'y2',
    },

  ],
};

const userChart = () => {
  return (
    <Chart data={data} options={options} />
  );
};

export default userChart;
