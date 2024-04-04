import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas"; // Import html2canvas
import "./Modal.css"; // Import the CSS file

const ReportModal = ({ report, onClose }) => {
  const [modalContent, setModalContent] = useState("");
  const modalRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => modalRef.current,
  });

  const handleDownloadPDF = () => {
    // Use html2canvas to capture modal content as an image
    html2canvas(modalRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Initialize jsPDF
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    });
  };

  return (
    <>
      {/*<div className="overlay" onClick={onClose}></div>*/}
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <div id="report-details">
            <h2 style={{ color: "black", fontSize: "2rem" }}>Report Details</h2>
            <p style={{ color: "black" }}>Report ID: {report._id}</p>
            <p style={{ color: "black" }}>Facility Name: {report.FacilityName}</p>
            <p style={{ color: "black" }}>Serial Number: {report.SerialNumber}</p>
            <p style={{ color: "black" }}>Type: {report.type}</p>
            <p style={{ color: "black" }}>Work Done: {report.WorkDone}</p>
            <p style={{ color: "black" }}>Further Works: {report.FurtherWorks}</p>
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
