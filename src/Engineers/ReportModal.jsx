import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./Modal.css"; // Import the CSS file

const ReportModal = ({ report, onClose }) => {
  const modalRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => modalRef.current,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: modalRef.current });
    doc.save("report.pdf");
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <div id="report-details">
            <h2 style={{color:"balck",fontSize:"2rem"}}>Report Details</h2>
            <p style={{color:"black"}}>Report ID: {report._id}</p>
            <p style={{color:"black"}}>Facility Name: {report.FacilityName}</p>
            <p style={{color:"black"}}>Serial Number: {report.SerialNumber}</p>
            <p style={{color:"black"}}>Engineer's Remarks: {report.Remarks}</p>
            
          </div>
          <button onClick={handlePrint}>Print Report</button>
          <button onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
