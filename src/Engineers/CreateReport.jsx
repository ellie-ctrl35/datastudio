import { useContext, useState,useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const CreateReport = () => {
  const { userInfo,logout } = useContext(AuthContext);
  const name = userInfo.username;

  useEffect(() => { 
    console.log(name)
    axios.post('http://localhost:8080/getassignedrequest',name).then((res)=>{
      console.log(res.data)
    })
  },[]);
  
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
          <Link className="navlink" to="engineers/report-history">
            Reports History
          </Link>
          <button className="navlink" onClick={()=>logout()}>Logout</button>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="bottom-half">
        <div className="head">
          <p>Request ID</p>
          <p>Request Type</p>
          <p>Client</p>
        </div>
        <ul className="request-list">

        </ul>
      </div>
    </div>
  );
};

export default CreateReport;
