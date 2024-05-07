import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import "./Admin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ReportModal from "./ReportModal";
import Loader from "react-loader-spinner"; // Import loader
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // Import loader styles

const AllReports = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getallreports")
      .then((res) => {
        console.log(res);
        setRequests(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
        setLoading(false);
      });
  }, []);

  const openModal = (request) => {
    setSelectedReport(request);
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
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="request-container">
        {loading ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} // 3 secs timeout
          />
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
