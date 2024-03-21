import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChartComponent = ({ resultdata }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  console.log(resultdata)
  const data = resultdata && resultdata.map((item, i) => ({
    label: `Question # ${i + 1}`,
    value: item?.QuestionData?.QuestionPercentageAchieved / 10
  }));

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      // Extracting data for labels and values
      const labels = data.map(item => item.label);
      const values = data.map(item => item.value);

      // Create the chart
      chartInstance.current = new Chart(ctx, {
        type: 'pie', // Change type to 'pie'
        data: {
          labels: labels,
          datasets: [{
            label: 'Percentage',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)', // Adjust colors as needed
              'rgba(54, 162, 235, 0.7)',
              'brown',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div className='piechart'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChartComponent;
