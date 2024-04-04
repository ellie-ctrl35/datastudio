import React, { useContext, useState, useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ReportModal from "./ReportModal"; // Assuming you have a modal component for report details

const ReportHistory = () => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [createdReport, setCreatedReport] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // Track the selected report for modal
  useEffect(() => {
    const encodedName = encodeURIComponent(name);

    axios
      .get(`http://localhost:8080/getcreatedreports?name=${encodedName}`)
      .then((res) => {
        setCreatedReport(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch created requests:", error);
      });
  }, [name]);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="App">
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont">
          <Link className="navlink" to="/engineers/create-report">
            Create Report
          </Link>
          <Link className="navlink" to="/engineers/report-history">
            Reports History
          </Link>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="bottom-half">
        <div className="head">
          <p>Report ID</p>
          <p>Facility Name</p>
          <p>Serial Number</p>
        </div>
        <ul className="request-list">
          {createdReport.map((report) => (
            <li className="thelist" key={report._id}>
              <p>{report._id}</p>
              <p>{report.FacilityName}</p>
              <p>{report.SerialNumber}</p>
              <button className="createbtn" onClick={() => openModal(report)}>
                View Report
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedReport && (
        <ReportModal report={selectedReport} onClose={closeModal} />
      )}
    </div>
  );
};

export default ReportHistory;
