import React, { useContext, useState, useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import ReportCreationModal from "./ReportCreationModal";
import { ThreeDots } from "react-loader-spinner";

const CreateReport = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const [assignedRequest, setAssignedRequest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleReportSubmit = (reportDetails) => {
    console.log("Report Details: ", reportDetails);
    // When you open the modal for a specific request// Ensure requestId is correctly included
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Ensure that 'name' is encoded properly in case of special characters.
    const encodedName = encodeURIComponent(name);

    axios
      .get(`http://localhost:8080/getassignedrequest?name=${encodedName}`)
      .then((res) => {
        console.log(res.data); // Now you can use res.data to display the reports
        setAssignedRequest(res.data.data);
        setLoading(false); // Set loading to false when data is fetched
        console.log("assigned Request", assignedRequest);
      })
      .catch((error) => {
        toast.error("Failed to fetch assigned requests:", error);
      });
  }, [name,isModalOpen]); // Depend on 'name' to re-fetch if it changes

  return (
    <div className="App">
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont2">
          <Link className="navlink" to="/engineers/create-report">
            Create Report
          </Link>
          <Link className="navlink" to="/engineers/report-history">
            Reports History
          </Link>
          <button className="navlink" onClick={() => logout()}>
            Logout
          </button>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="bottom-half">
        <div className="head">
          <p>Request ID</p>
          <p>Request Type</p>
          <p>Client</p>
        </div>
        {loading ? (
          <div className="loading-container">
            <ThreeDots color="#fff" height={80} width={80} />
          </div>
        ) : (
          <ul className="request-list">
            {assignedRequest.map((request) => (
              <li className="thelist" key={request._id}>
                <p>{request._id}</p>
                <p>{request.type}</p>
                <p>{request.author}</p>
                <button
                  className="createbtn"
                  onClick={() => {
                    setSelectedNotification(request); // Correctly capturing the request object here
                    setIsModalOpen(true);
                  }}
                >
                  Create Report
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ReportCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
        defaultValues={selectedNotification || {}}
        selectedRequestId={selectedNotification?._id} // Pass this to the modal
      />
      <ToastContainer />
    </div>
  );
};

export default CreateReport;
