import { useContext, useState, useEffect } from "react";
import "./Client.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

const NRequest = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const author = userInfo.email;
  const name = userInfo.username;

  useEffect(() => {
    axios
      .get("http://localhost:8080/getmyrequest?author=" + author)
      .then((res) => {
        console.log("pure response", res.data.data);
        // Filter requests with status "pending"
        const filteredRequests = res.data.data.filter(
          (request) => request.status === "Pending"
        );
        setRequests(filteredRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch requests:", error);
        if (!errorDisplayed) {
          setErrorDisplayed(true);
          toast.error("Failed to fetch requests. Please try again later.");
        }
        setLoading(false);
      });
  }, [author, errorDisplayed]);

  return (
    <div className="App">
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont">
          <Link className="navlink" to="/client/new-request">
            New Request
          </Link>
          <Link className="navlink" to="/client/requests/approved">
            Confirmed Requests
          </Link>
          <Link className="navlink" to="/client/requests/not-approved">
            Pending Requests
          </Link>
          <Link className="navlink" to="/client/requests/not-approved">
            Official Reports
          </Link>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="table-list">
        <h2 style={{ fontFamily: "Montserrat", color: "white" }}>
          Pending Requests
        </h2>
        {loading ? (
          <ThreeDots color="#fff" height={80} width={80} />
        ) : (
          <ul className="listbox">
            <div className="list-item">
              <h3>Report ID</h3>
              <p>Report Title</p>
              <p>Report Type</p>
              <p>Report Status</p>
              <p>Assigned To</p>
            </div>
            {requests.map((request) => (
              <div className="item" key={request._id}>
                <p>{request._id.substring(0, 8)}</p>
                <p>{request.title}</p>
                <p>{request.type}</p>
                <p>{request.status}</p>
                <p>{request.AssignTo}</p>
              </div>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default NRequest;
