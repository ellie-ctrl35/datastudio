import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const MonthlyReportChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Monthly Report Counts',
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#506385',
        '#cc65fe',
        '#445ce2',
        '#e244b1',
        '#0c9fda',
        '#56ff63',
        '#b256ff',
        '#ff9f40',
        '#4bc0c0',
        '#ff6384'
      ],

    }],
  });

  const fetchMonthlyReportCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/monthly-report-counts');
      const data = response.data;
      
      // Assuming the response data structure has been simplified
      const labels = data.map(item => `Month ${item.month}`);
      const counts = data.map(item => item.count);
  
      setChartData(prevData => ({
        ...prevData,
        labels,
        datasets: [{
          ...prevData.datasets[0],
          data: counts,
        }],
      }));
      
    } catch (error) {
      console.error('Error fetching monthly report counts:', error);
    }
  };
  
  useEffect(() => {
    fetchMonthlyReportCounts();
  }, []);

  return (
    <div>
      
      <Doughnut data={chartData} />
    </div>
  );
};

export default MonthlyReportChart;
