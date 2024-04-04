import { useContext, useState, useEffect } from "react";
import "./Client.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const NRequest = () => {
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);

  const author = userInfo.email;
  const name = userInfo.username;
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getmyrequest?author=" + author)
      .then((res) => {
        console.log("pure response", res.data.data);
        setRequests(res.data.data);
      });
  }, []);
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
        <ul className="listbox">
          <div className="list-item">
            <h3>Report ID</h3>
            <p>Report Title</p>
            <p>Report Type</p>
            <p>Report Status</p>
            <p>Assigned To</p>
          </div>
          {requests.map((request) => {
            <div className="item" key={request._id}></div>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default NRequest;
