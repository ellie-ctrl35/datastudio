import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas"; // Import html2canvas
import "./Modal.css"; // Import the CSS file
import Logo from '../resources/logo.png';

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
            <img src={Logo} alt="Logo" style={{ width: "100px", height: "100px",alignSelf:"center" }} />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <tr>
    <td style={{ width: '30%' }}>Name of Facility:</td>
    <td style={{ width: '70%' }}><input type="text" value={report.FacilityName} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Equipment Name:</td>
    <td><input type="text" value={report.EquipmentName} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>City/Town:</td>
    <td><input type="text" value={report.CityTown} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Facility Asset No:</td>
    <td><input type="text" value={report.FacilityAssetNo} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Model Number:</td>
    <td><input type="text" value={report.ModelNumber} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Serial Number:</td>
    <td><input type="text" value={report.SerialNumber} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Date(s):</td>
    <td><input type="text" value={report.Date} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Problem Description:</td>
    <td><textarea value={report.ProblemDescription} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Work Done:</td>
    <td><textarea value={report.WorkDone} style={{ width: '100%' }} /></td>
  </tr>
  
  <tr>
    <td>If Yes, State what needs to be done:</td>
    <td><textarea value={report.FurtherWorkRequired} style={{ width: '100%' }} /></td>
  </tr>
  <tr>
    <td>Recommendation(s):</td>
    <td><textarea value={report.Recommendations} style={{ width: '100%' }} /></td>
  </tr>
</table>

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
