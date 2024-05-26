import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

const OfficialReportModal = ({ report, onClose }) => {
  const modalRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => modalRef.current,
  });

  const handleDownloadPDF = () => {
    html2canvas(modalRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Official-Report.pdf");
    });
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    maxHeight: "80%",
    overflowY: "auto",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color:"#000"
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "1.5rem",
    color: "#333",
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle} ref={modalRef}>
        <h2 style={titleStyle}>Official Report Details</h2>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={thTdStyle}>Engineer:</td>
              <td style={thTdStyle}>{report.Engineer}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Facility Name:</td>
              <td style={thTdStyle}>{report.FacilityName}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Equipment Name:</td>
              <td style={thTdStyle}>{report.EquipmentName}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Serial Number:</td>
              <td style={thTdStyle}>{report.SerialNumber}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Model Number:</td>
              <td style={thTdStyle}>{report.modelNumber}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Status:</td>
              <td style={thTdStyle}>{report.status}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Problem Description:</td>
              <td style={thTdStyle}>{report.ProblemDesc}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Work Done:</td>
              <td style={thTdStyle}>{report.WorkDone}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Further Works:</td>
              <td style={thTdStyle}>{report.FurtherWorks}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Further Work Description:</td>
              <td style={thTdStyle}>{report.FurtherWorkDesc}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Type:</td>
              <td style={thTdStyle}>{report.type}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Request ID:</td>
              <td style={thTdStyle}>{report.requestId}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Sent To:</td>
              <td style={thTdStyle}>{report.sendTo}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Created At:</td>
              <td style={thTdStyle}>{new Date(report.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>Updated At:</td>
              <td style={thTdStyle}>{new Date(report.updatedAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <button style={buttonStyle} onClick={handlePrint}>Print Report</button>
        <button style={buttonStyle} onClick={handleDownloadPDF}>Download PDF</button>
        <button style={buttonStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OfficialReportModal;
