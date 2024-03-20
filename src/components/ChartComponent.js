// ChartComponent.js
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ optionSelections, clickedOption }) => {
    const chartRef = useRef(null);

    const [resultArray , setdata] = useState()

    useEffect(() => {
        setdata(optionSelections?.map(option => option.OptionData._id === clickedOption ? 1 : 0))
    },[clickedOption , optionSelections])

    console.log(resultArray);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: optionSelections?.map(option => option.OptionData.Name),
                datasets: [{
                    label: "Pair Perfect",
                    data: resultArray,
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
    }, [optionSelections , clickedOption , resultArray]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
