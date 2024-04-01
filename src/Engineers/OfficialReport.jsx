import React from 'react';
import { useParams, Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const OfficialReport = () => {
  // Assuming you're passing the report details via route state or fetching it using the ID
  const { reportId } = useParams(); // If you're using report ID in the route
  // const report = location.state.report; // If passing via state

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Official Report", 20, 20);
    // Add more content here
    doc.save('report.pdf');
  };

  return (
    <div  className="App">
      <h1>Official Report</h1>
      <p>Report ID: {reportId}</p>
      {/* Display other report details */}
      <button onClick={downloadPDF}>Download Report</button>
      <Link to="/engineers/report-history">Back to History</Link>
    </div>
  );
};

export default OfficialReport;
