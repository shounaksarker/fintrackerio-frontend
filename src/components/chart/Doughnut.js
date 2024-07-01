import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const defaultBgColors = [
  '#FF6384',
  '#299D91',
  '#FFCE56',
  '#36A2EB',
  '#E73D1C',
  '#D0D5DD',
  '#1d756c',
  '#666666',
];
const DoughnutChart = ({ data = [], labels = [], colors, title, titleStyle, className = 'h-80' }) => {
  const dataObj = {
    labels: labels.map((label) => {
      return label.replace(/\b\w/g, (char) => char.toUpperCase());
    }),
    datasets: [{ data, backgroundColor: colors || defaultBgColors }],
  };
  const titleObj = {
    display: !!(title && data.length),
    text: title.replace(/\b\w/g, (char) => char.toUpperCase()),
    color: (titleStyle && titleStyle.color) || '#000000',
    font: titleStyle && {
      weight: titleStyle.fontWeight || 'normal',
      size: titleStyle.fontSize || 16,
      textTransform: 'capitalize',
    },
  };
  useEffect(() => {
    const canvas = document.getElementById('DoughnutChart');

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const config = {
      type: 'doughnut',
      data: dataObj,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: titleObj,
        },
      },
    };

    const chart = (canv, conf) => new Chart(canv, conf);
    chart(canvas, config);
  }, [data]);

  return (
    <div className={`${className}`}>
      <canvas id="DoughnutChart"></canvas>
    </div>
  );
};

export default DoughnutChart;
