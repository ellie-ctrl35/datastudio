import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const RequestChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchReportCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/report-counts-last-10-days');
      const data = response.data;
  
      // Extract unique days and sort them
      const days = [...new Set(data.map(item => item._id.day))].sort();
  
      // Extract unique types
      const types = [...new Set(data.map(item => item._id.type))];
  
      // Initialize datasets with empty data arrays
      const datasets = types.map(type => ({
        label: type,
        data: new Array(days.length).fill(0), // Initialize with zeroes
        backgroundColor: type === 'PMReport' ? '#506385' : type === 'CMReport' ? '#adada4' : 'dodgerblue',
        stack: 'Stack 0',
      }));
  
      // Populate the datasets
      data.forEach(item => {
        const dayIndex = days.indexOf(item._id.day);
        const typeIndex = types.indexOf(item._id.type);
  
        if (dayIndex !== -1 && typeIndex !== -1) {
          datasets[typeIndex].data[dayIndex] = item.count;
        }
      });
  
      setChartData({
        labels: days.map(day => `Day ${day}`), // Transform day numbers into labels
        datasets,
      });
    } catch (error) {
      console.error('Error fetching report counts:', error);
    }
  };
  
  useEffect(() => {
    fetchReportCounts();
  }, []);

  return (
    <div>
      {chartData.labels.length > 0 && (
        <Bar
        key={chartData.labels.join(",,")}
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Report Counts by Type',
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      )}
    </div>
  );
  
};

export default RequestChart;
