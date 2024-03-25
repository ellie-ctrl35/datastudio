import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Import ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Register ArcElement
);


const MonthlyReportChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
  datasets: [{
    label: 'Monthly Report Counts',
    data: [],
    backgroundColor: [], // You can predefine this or leave it empty and set later
  }],
  });

  const fetchMonthlyReportCounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/monthly-report-counts');
      const data = response.data;
      
      if (data && data.length > 0) {
        const reportType = 'YourReportType'; // Ensure this matches exactly
        const filteredData = data.filter(item => item._id.type === reportType);
  
        if (filteredData.length > 0) {
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
        } else {
          console.log('No matching data found for the specified report type');
          // Handle case where filteredData is empty
        }
      } else {
        console.log('No data returned from the API');
        // Handle case where data is empty or undefined
      }
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
