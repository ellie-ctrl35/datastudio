import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import "./Admin.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const AllReports = () => {
  const [requests,setRequests]= useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/getallreports")
    .then(res => {
      console.log(res);
      setRequests(res.data.data)
      console.log("Allreport:",requests)
    })
    .catch(error => console.error("Error fetching requests", error));

  },[])
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
          <Avatar round name="Emmanuel Nyatepe" size={40} />
        </div>
      </div>
      <div className="request-container">
        <ul className="request-list">
          {requests.map((request) => (
            <div key={request._id} className="request">
              <p>{request.Engineer}</p>
              <p>{request.FacilityName}</p>
              <p>{request.SerialNumber}</p>
              <p>{request.type}</p>
              <p>{request.createdAt}</p>
              <button className="request-btn">View Report</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllReports;
