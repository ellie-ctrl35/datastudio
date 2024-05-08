import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import "./Admin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ReportModal from "./ReportModal";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllReports = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo,logout } = useContext(AuthContext);
  const name = userInfo.username;
  const email = userInfo.email;
  const [selectedReport, setSelectedReport] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getallreports")
      .then((res) => {
        console.log(res);
        setRequests(res.data.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
        setLoading(false); // Set loading to false on error
        toast.error("Error fetching data"); // Display toast notification
      });
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const openModal = (request) => {
    setSelectedReport(request);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="App">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont">
          <Link className="navlink" to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="navlink" to="/admin/all-reports">
            Reports
          </Link>
          <Link className="navlink" to="/admin/all-requests">
            All Requests
          </Link>
          <Link className="navlink" to="/admin/add-user">
            Add User
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
      <div className="request-container">
        {loading ? (
          <ThreeDots color="#fff" height={80} width={80} />
        ) : (
          <ul className="request-list">
            {requests.map((request) => (
              <div key={request._id} className="request">
                <p>{request.Engineer}</p>
                <p>{request.FacilityName}</p>
                <p>{request.SerialNumber}</p>
                <p>{request.type}</p>
                <p>{request.createdAt}</p>
                <button
                  className="request-btn"
                  onClick={() => openModal(request)}
                >
                  View Report
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {selectedReport && (
        <ReportModal request={selectedReport} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllReports;
