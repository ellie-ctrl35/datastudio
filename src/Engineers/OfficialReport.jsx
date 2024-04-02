import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import jsPDF from 'jspdf';

const OfficialReport = () => {
    const location = useLocation(); // Access location object

    if (!location.state) {
        return (
            <div className="App">
                <p>Report information is unavailable. Please navigate back to the reports history and try again.</p>
                <Link to="/engineers/report-history">Back to Reports History</Link>
            </div>
        );
    }
    
    const report = location.state.report; // Access report object passed via state
  
    const downloadPDF = () => {
      const doc = new jsPDF();
      doc.text("Official Report", 20, 20);
      doc.text(`Report ID: ${report._id}`, 20, 30); // Example placement
      doc.text(`Facility Name: ${report.FacilityName}`, 20, 40); // Example placement
      doc.text(`Engineer Name: ${report.EngineerName}`, 20, 50); // Adjust based on your actual data
      // Add more fields as needed
  
      doc.save('report.pdf');
    };
  
    return (
      <div className="App">
        <h1>Official Report</h1>
        <p style={{color:"dodgerblue"}}>Report ID: {report._id}</p>
        <p style={{color:"dodgerblue"}} >Facility Name: {report.FacilityName}</p>
        <p style={{color:"dodgerblue"}}>Engineer Name: {report.EngineerName}</p>
        {/* Display other report details */}
        <button onClick={downloadPDF}>Download Report</button>
        <Link to="/engineers/report-history">Back to History</Link>
      </div>
    );
  };

  export default OfficialReport;
