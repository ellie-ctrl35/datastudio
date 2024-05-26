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
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <div id="report-details">
            <img src={Logo} alt="Logo" className="modal-logo" />
            <table className="report-table">
              <tbody>
              <tr>
                  <td className="label">Report-ID:</td>
                  <td className="value">{report._id}</td>
                </tr>
                <tr>
                  <td className="label">Name of Facility:</td>
                  <td className="value">{report.FacilityName} </td>
                </tr>
                <tr>
                  <td className="label">Equipment Name:</td>
                  <td className="value">{report.EquipmentName} </td>
                </tr>
                <tr>
                  <td className="label">Engineer Name:</td>
                  <td className="value">{report.Engineer} </td>
                </tr>
                <tr>
                  <td className="label">Type:</td>
                  <td className="value">{report.type} </td>
                </tr>
                <tr>
                  <td className="label">Modal number:</td>
                  <td className="value">{report.modelNumber} </td>
                </tr>
                <tr>
                  <td className="label">Serial Number:</td>
                  <td className="value">{report.SerialNumber} </td>
                </tr>
                <tr>
                  <td className="label">Date(s):</td>
                  <td className="value">{report.createdAt} </td>
                </tr>
                <tr>
                  <td className="label">Problem Description:</td>
                  <td className="value">{report.ProblemDesc}</td>
                </tr>
                <tr>
                  <td className="label">Work Done:</td>
                  <td className="value">{report.WorkDone} </td>
                </tr>
                <tr>
                  <td className="label">If Yes, State what needs to be done:</td>
                  <td className="value">{report.FurtherWorkDesc}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-buttons">
            <button onClick={handlePrint} className="modal-button">Print Report</button>
            <button onClick={handleDownloadPDF} className="modal-button">Download PDF</button>
            <button onClick={onClose} className="modal-button">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
