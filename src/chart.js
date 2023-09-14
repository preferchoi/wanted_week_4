import React, {useState} from 'react';
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
    y1: {
      type: 'linear',
      position: 'left',
      id: 'y1',
      max: 200,
    },
    y2: {
      type: 'linear',
      position: 'right',
      id: 'y2',
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const labelIndex = context.dataIndex;
          const originalObject = mock_data?.response[chartLabels[labelIndex]];
          return [
            `ID: ${originalObject?.id}`,
            `Value Area: ${originalObject?.value_area}`,
            `Value Bar: ${originalObject?.value_bar}`,
          ];
        }
      }
    }
  },
};

export const data = {
  labels: chartLabels,
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

const uniqueIds = Array.from(new Set(Object.values(mock_data?.response).map(entry => entry.id)));

const UserChart = () => {
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = {
    ...data,
    datasets: data.datasets.map((dataset) => {
      return {
        ...dataset,
        backgroundColor: dataset.data.map((_, index) => {
          const originalObject = mock_data?.response[chartLabels[index]];
          return originalObject?.id === selectedId ? 'rgba(255, 99, 132, 0.8)' : 'rgba(75, 192, 192, 0.5)';
        }),
      };
    }),
  };
  return (
    <div>
      <div>
        <h3>Select ID to Highlight</h3>
        {uniqueIds.map((id) => (
          <button key={id} onClick={() => setSelectedId(id)}>
            {id}
          </button>
        ))}
      </div>
      <Chart data={filteredData} options={options} />
    </div>
  );
};

export default UserChart;
