// ChartComponent.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ optionSelections }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: ['Agreed', 'Strongly Agreed', 'Disagree', 'Strongly Disagree'],
                datasets: [{
                    label: 'Option',
                    data: optionSelections,
                    fill: false, // Remove fill for line chart
                    borderColor: '#591b18', // Set border color
                    tension: 0.1 // Set line tension (curvature)
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

        return () => {
            myChart.destroy(); // Clean up the chart when component unmounts
        };
    }, [optionSelections]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
