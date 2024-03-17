import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChartComponent = ({resultdata}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  const data = resultdata && resultdata?.map((item,i) => {
    return({
        label:`Question # ${i + 1}`,
        value:item.TotalPercentageAchieved
    })
  })

  console.log(data)
 


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
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Percentage',
            data: values,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust color as needed
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
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      
    </div>
  );
};

export default LineChartComponent;
