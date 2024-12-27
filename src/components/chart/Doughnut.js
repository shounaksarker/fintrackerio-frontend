import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

// const defaultBgColors = [
//   '#FF6384',
//   '#299D91',
//   '#FFCE56',
//   '#36A2EB',
//   '#E73D1C',
//   '#D0D5DD',
//   '#1d756c',
//   '#666666',
//   '#4BC0C0',
//   '#FF9F40',
//   '#9966FF',
//   '#FF6B6B',
//   '#FFD700',
//   '#4CAF50',
//   '#E57373',
//   '#3F51B5',
//   '#8E24AA',
//   '#00ACC1',
// ];

const defaultBgColors = [
  '#299D91',
  '#FF6384',
  '#FF8F33',
  '#D9C06F',
  '#04909D',
  '#33FFF5',
  '#3357FF',
  '#C34E56',
  '#7D6CB9',
  '#8D33FF',
  '#E73D1C',
  '#D0D5DD',
  '#338FFF',
  '#33FF8F',
  '#FABC3F',
  '#FF33F6',
  '#FFD433',
  '#8FFF33',
  '#FF33FF',
  '#33D4FF',
  '#A1FF33',
  '#FF6F33',
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
    <div className={`${!data.length ? 'hidden' : className}`}>
      <canvas id="DoughnutChart"></canvas>
    </div>
  );
};

export default DoughnutChart;
