import React, { useState, useContext } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const ReportCreationModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues = {},
  selectedRequestId,
}) => {
  const { userInfo } = useContext(AuthContext);
  const engineer = userInfo.username;
  const [facilityName, setFacilityName] = useState(
    defaultValues.facilityName || ""
  );
  const [equipmentName, setEquipmentName] = useState(
    defaultValues.equipmentName || ""
  );
  const [serialNumber, setSerialNumber] = useState(
    defaultValues.serialNumber || ""
  );
  const [modelNumber, setModelNumber] = useState(
    defaultValues.modelNumber || ""
  );
  const [problemDesc, setProblemDesc] = useState(
    defaultValues.problemDesc || ""
  );
  const [workDone, setWorkDone] = useState(defaultValues.workDone || "");
  const [furtherWorks, setFurtherWorks] = useState(
    defaultValues.furtherWorks || "false"
  );
  const [furtherWorkDesc, setFurtherWorkDesc] = useState(
    defaultValues.furtherWorkDesc || ""
  );
  const [reportType, setReportType] = useState(defaultValues.type || "");

  if (!isOpen) return null;

  const makeReport = (e) => {
    e.preventDefault();
    const reportDetails = {
      Engineer: engineer,
      FacilityName: facilityName,
      EquipmentName: equipmentName,
      SerialNumber: serialNumber,
      modelNumber: modelNumber,
      ProblemDesc: problemDesc,
      WorkDone: workDone,
      FurtherWorks: furtherWorks,
      FurtherWorkDesc: furtherWorkDesc,
      type: reportType,
      requestId: selectedRequestId,
    };
    console.log("Report Details: ", reportDetails);
    axios
      .post("http://localhost:8080/createreport", reportDetails)
      .then((res) => {
        console.log(res.data);
        toast.success("Report Created Successfully");
        setFacilityName("");
        setEquipmentName("");
        setSerialNumber("");
        setModelNumber("");
        setProblemDesc("");
        setWorkDone("");
        setFurtherWorks("false");
        setFurtherWorkDesc("");
        setReportType("");
        onClose();
        onSubmit(reportDetails);
      })
      .catch((error) => {
        console.error("Failed to create report:", error);
        toast.error("Failed to create report");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ color: "black" }}>Create Report</h2>
        <form onSubmit={makeReport}>
          {/* Add form inputs here, matching the schema fields */}
          <h2 style={{ color: "black" }}>{engineer}</h2>
          <input
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            placeholder="Facility Name"
          />
          <input
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            placeholder="Equipment Name"
            required
          />
          <input
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Serial Number"
          />
          <input
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            placeholder="Model Number"
          />
          <textarea
            value={problemDesc}
            onChange={(e) => setProblemDesc(e.target.value)}
            placeholder="Problem Description"
          />
          <textarea
            value={workDone}
            onChange={(e) => setWorkDone(e.target.value)}
            placeholder="Work Done"
          />
          <select
            value={furtherWorks}
            onChange={(e) => setFurtherWorks(e.target.value)}
          >
            <option value="false">No Further Works</option>
            <option value="true">Further Works Required</option>
          </select>
          <textarea
            value={furtherWorkDesc}
            onChange={(e) => setFurtherWorkDesc(e.target.value)}
            placeholder="Further Work Description"
          />
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            required
          >
            <option value="">Select Report Type</option>
            <option value="CMReport">CMReport</option>
            <option value="PMReport">PMReport</option>
            <option value="PPMReport">PPMReport</option>
            <option value="regular">Regular</option>
          </select>
          {/* Submit and Close buttons */}
          <button type="submit">Submit Report</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportCreationModal;