import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const MonthlyReportChart = () => {
  const [chartData, setChartData] = useState({});

  const fetchMonthlyReportCounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/monthly-report-counts');
      const data = response.data;

      // Assuming you want to display counts for a specific report type
      // Adjust 'YourReportType' to match one of your actual report types
      const reportType = 'YourReportType';
      const filteredData = data.filter(item => item._id.type === reportType);

      const labels = filteredData.map(item => `Month ${item._id.month}`);
      const counts = filteredData.map(item => item.count);

      setChartData({
        labels,
        datasets: [{
          label: 'Monthly Report Counts',
          data: counts,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
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
    } catch (error) {
      console.error('Error fetching monthly report counts:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyReportCounts();
  }, []);

  return (
    <div>
      <h2>Monthly Report Counts</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default MonthlyReportChart;
