import { useState, useContext,useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ReportChart from "./StackedChart";

const Admindash = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const [completed,setCompleted]=useState('') 
  const [Uncompleted,setUncompleted]=useState('')
  const [ReportsTotal,setReportsTotal]=useState('')
  const[requestTotal,setRequestTotal]=useState('')
  const [dailyReports,setDailyReports]=useState('')
  useEffect(()=>{
   axios.get('http://localhost:8080/getcompletedtasks').then((res)=>{
    setCompleted(res.data.data)
   })
   axios.get('http://localhost:8080/getuncompletedtasks').then((res)=>{
    setUncompleted(res.data.data)
   })
   axios.get('http://localhost:8080/getallreportscount').then((res)=>{
    
    setReportsTotal(res.data.data)
   })
   axios.get('http://localhost:8080/getallrequestscount').then((res)=>{
    
     setRequestTotal(res.data.data)
   })
   axios.get('http://localhost:8080/reports-today').then((res)=>{
      console.log("count",res.data.count)
      setDailyReports(res.data.count)
    })

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
          <button
            onClick={() => logout()}
            className="navlink"
            to="/admin/add-user"
          >
            Logout
          </button>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="Admindash-container">
        <div className="figures-container">
          <div className="figure-item">
            <h2>Completed Tasks</h2>
            <div className="figure">
              {completed}
            </div>
          </div>
          <div
            className="figure-item"
            style={{ background: "#adada4", color: "black" }}
          >
            <h2>Daily Reports</h2>
            <div className="figure">
              {dailyReports}
            </div>
          </div>
          <div className="figure-item">
            <h2>Reports Total</h2>
            <div className="figure">
              {ReportsTotal}
            </div>
          </div>
          <div
            className="figure-item"
            style={{ background: "#adada4", color: "black" }}
          >
            <h2>Request Total</h2>
            <div className="figure">
              {requestTotal}
            </div>
          </div>
          <div
            className="figure-item"
            style={{ background: "#adada4", color: "black" }}
          >
            <h2>Uncompleted Requests</h2>
            <div className="figure">
             {Uncompleted}
            </div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-api-usage">
              <h2>Report Type Distribution </h2>
              <div className="chart-circle"></div>
            </div>
          </div>
          <div className="chart-item">
            <div className="chart-work-life-balance">
              <h2>Request Type Distribution</h2>
              <div className="chart-circle"></div>
            </div>
          </div>
          <div className="chart-item">
            <div className="chart-custom-dashboard">
              <h2>Custom Dashboard</h2>
              <span>10/20 Templates</span>
              <div className="chart-navigation"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="barchart">
        <div className="barchart1">
          <ReportChart />
        </div>
        <div className="barchart1"></div>
        <div className="piechart1"></div>
      </div>
    </div>
  );
};

export default Admindash;
