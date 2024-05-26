import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas"; // Import html2canvas
import "../Engineers/Modal.css"; // Import the CSS file
import axios from "axios";
import { toast } from "react-toastify";

const ReportModal = ({ request, onClose }) => {
  const [modalContent, setModalContent] = useState("");
  const modalRef = useRef();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [loadingClients, setLoadingClients] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then((res) => {
        console.log(res.data); // Check the structure of the response data
        const users = res.data.data || []; // Safely access the data property
        const filteredClients = users.filter(user => user.role === "client");
        setClients(filteredClients);
        setLoadingClients(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch clients");
        setLoadingClients(false);
      });
  }, []);

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
      pdf.save("Official-Report.pdf");
    });
  };

  const handleSendReport = () => {
    axios.put(`http://localhost:8080/sendreport/${request._id}`, { sendTo: selectedClient })
      .then(() => {
        toast.success("Report sent successfully");
        onClose();
      })
      .catch((error) => {
        toast.error("Failed to send report");
      });
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <div id="report-details">
            <h2 style={{ color: "black", fontSize: "2rem" }}>Report Details</h2>
            <p style={{ color: "black" }}>Report ID: {request._id}</p>
            <p style={{ color: "black" }}>Facility Name: {request.FacilityName}</p>
            <p style={{ color: "black" }}>Serial Number: {request.SerialNumber}</p>
            <p style={{ color: "black" }}>Type: {request.type}</p>
            <p style={{ color: "black" }}>Work Done: {request.WorkDone}</p>
            <p style={{ color: "black" }}>Further Works: {request.FurtherWorks}</p>
          </div>
          <button onClick={handlePrint}>Print Report</button>
          <button onClick={handleDownloadPDF}>Download PDF</button>
          {!request.sent && (
            <div className="send-report">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                disabled={loadingClients}
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client._id} value={client.username}>{client.username}</option>
                ))}
              </select>
              <button
                onClick={handleSendReport}
                disabled={!selectedClient}
              >
                Send Report
              </button>
            </div>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
