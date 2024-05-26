import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import "./AdminModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from '../resources/logo.png';

const ReportModal = ({ request, onClose }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [loadingClients, setLoadingClients] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then((res) => {
        const users = res.data.data || [];
        const filteredClients = users.filter(user => user.role === "client");
        setClients(filteredClients);
        setLoadingClients(false);
      })
      .catch(() => {
        toast.error("Failed to fetch clients");
        setLoadingClients(false);
      });
  }, []);

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

  const handleSendReport = () => {
    axios.put(`http://localhost:8080/sendreport/${request._id}`, { sendTo: selectedClient })
      .then(() => {
        toast.success("Report sent successfully");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to send report");
      });
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          <img src={Logo} alt="Logo" className="modal-logo" />
          <h2 className="modal-title">Report Details</h2>
          <div id="report-details">
            <p><strong>Report ID:</strong> {request._id}</p>
            <p><strong>Facility Name:</strong> {request.FacilityName}</p>
            <p><strong>Serial Number:</strong> {request.SerialNumber}</p>
            <p><strong>Type:</strong> {request.type}</p>
            <p><strong>Work Done:</strong> {request.WorkDone}</p>
            <p><strong>Further Works:</strong> {request.FurtherWorks}</p>
          </div>
          {!request.sent && (
              <div className="send-report">
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  disabled={loadingClients}
                  className="modal-select"
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client._id} value={client.username}>{client.username}</option>
                  ))}
                </select>
                <button
                  onClick={handleSendReport}
                  disabled={!selectedClient}
                  className="modal-button"
                >
                  Send Report
                </button>
              </div>
            )}
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
