'use client';

import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ScaleChart = ({ className, xLabel = [], data = [] }) => {
  useEffect(() => {
    const ctx = document.getElementById('scaleChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const chart = (ctxx, conf) => new Chart(ctxx, conf);
    const datai = {
      labels: xLabel,
      datasets: data.map((info) => ({
        type: info.type || 'bar',
        label: info.label || 'data Label',
        hoverBackgroundColor: info.hoverBackgroundColor,
        data: info.data || [10, 20, 30, 40],
        borderColor: info.borderColor || '#299D91',
        backgroundColor: info.backgroundColor || '#299D91',
        ...info.rest,
      })),
    };

    chart(ctx, {
      type: 'bar',
      data: datai,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(228, 231, 236, 0.55)',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(228, 231, 236, 0.75)',
            },
          },
        },
      },
    });
  });

  return (
    <div className={`${className}`}>
      <canvas id="scaleChart" style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default ScaleChart;
