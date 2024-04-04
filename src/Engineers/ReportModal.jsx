import React from "react";
import ReactDOM from "react-dom";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ReportModal = ({ report, onClose }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#report-details' });
    doc.save('report.pdf');
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content" ref={componentRef}>
        <div id="report-details">
          <h2>Report Details</h2>
          <p>Report ID: {report._id}</p>
          <p>Facility Name: {report.FacilityName}</p>
          <p>Serial Number: {report.SerialNumber}</p>
          {/* Add more details as needed */}
        </div>
        <button onClick={handlePrint}>Print Report</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ReportModal;
