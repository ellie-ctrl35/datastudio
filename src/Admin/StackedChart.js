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
  

const ReportChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchReportCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/report-counts-last-10-days');
      const data = response.data;
      const types = data.map(item => item._id);
      const counts = data.map(item => item.count);

      setChartData({
        labels: types,
        datasets: [
          {
            label: 'Report Counts',
            data: counts,
            backgroundColor: types.map(type => {
              if (type === 'PMReport') return 'yellow';
              if (type === 'CMReport') return 'blue';
              return 'dodgerblue'; // Assuming PPMReport should also be green as per the instructions
            }),
          },
        ],
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
      <h2>Report in the last 10 days</h2>
      {chartData.labels.length > 0 && (
        <Bar
        key={chartData.labels.join(",")}
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

export default ReportChart;
