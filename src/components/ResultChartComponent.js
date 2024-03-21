import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChartComponent = ({ resultdata }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Assuming resultdata is an array of two datasets
  const data1 = resultdata?.User1Data
 && resultdata?.User1Data?.map((item, i) => ({
    label: `Question # ${i + 1}`,
    value: item?.QuestionData?.QuestionPercentageAchieved / 10
  }));

  const data2 = resultdata?.User2Data && resultdata?.User2Data?.map((item, i) => ({
    label: `Question # ${i + 1}`,
    value: item?.QuestionData?.QuestionPercentageAchieved / 10
  }));

  useEffect(() => {
    if ((data1 && data1.length > 0 && data2 && data2.length > 0) && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      // Extracting data for labels and values
      const labels = data1.map(item => item.label);
      const values1 = data1.map(item => item.value);
      const values2 = data2.map(item => item.value);

      // Create the chart
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: resultdata?.User1Detail?.Name,
            data: values1,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust color as needed
            tension: 0.1
          }, {
            label: resultdata?.User2Detail?.Name,
            data: values2,
            fill: false,
            borderColor: 'rgba(192, 75, 192, 1)', // Adjust color as needed
            tension: 0.1
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
  }, [data1, data2]);

  return (
    <div className='linechart'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChartComponent;
