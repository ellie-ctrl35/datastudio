import React, { useContext, useState, useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ReportModal from "./ReportModal"; // Assuming you have a modal component for report details
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const ReportHistory = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const email = userInfo.email;
  const [createdReport, setCreatedReport] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // Track the selected report for modal
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const encodedName = encodeURIComponent(name);
    axios
      .get(`http://localhost:8080/getcreatedreports?name=${encodedName}`)
      .then((res) => {
        setCreatedReport(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch created reports:", error);
      });
  }, [name]);

  const openModal = (report) => {
    setSelectedReport(report);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const filteredReports = createdReport.filter((report) =>
    report.EquipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <ToastContainer />
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
          <Avatar
            round
            name={name}
            size={40}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div className="avatar-menu">
              <p>{name}</p>
              <p>{email}</p>
              <p>{userInfo.role}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div style={{position:"absolute",width:"25%",height:"6%",top:"2%",left:"15%"}}>
        <input
          type="text"
          placeholder="Search by equipment name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{width:"100%",height:"90%",border:"none",outline:"none",paddingLeft:"5%",fontFamily:"Inter",fontSize:"1.2rem",borderRadius:4}}
        />
      </div>
      {loading ? (
        <ThreeDots color="dodgerblue" height={120} width={120} />
      ) : (
        <div className="bottom-half">
          <div style={{display:'flex',flexDirection:"row",alignItems:"center",gap:"17%",width:"90%",fontFamily:"Inter",marginLeft:"-5%"}}>
            <p>Report ID</p>
            <p>Facility Name</p>
            <p>Serial Number</p>
            <p>Equipment Name </p>
          </div>
          <ul className="request-list">
          {filteredReports.map((report) => (
              <li className="thelist" key={report._id}>
                <p>{report._id}</p>
                <p>{report.FacilityName}</p>
                <p>{report.SerialNumber}</p>
                <p>{report.EquipmentName}</p> {/* Display equipment name */}
                <button className="createbtn" onClick={() => openModal(report)}>
                  View Report
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedReport && (
        <ReportModal report={selectedReport} onClose={closeModal} />
      )}
    </div>
  );
};

export default ReportHistory;
