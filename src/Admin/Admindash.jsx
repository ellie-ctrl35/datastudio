import React, { useState, useContext, useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { ThreeDots } from "react-loader-spinner";
import ReportChart from "./StackedChart";
import RequestChart from "./StackChart2";
import MonthlyReportChart from './MonthlyPie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDataFetch from "./useDataFetch";

const Admindash = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const email = userInfo.email;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: completed, loading: loadingCompleted } = useDataFetch("http://localhost:8080/getcompletedtasks");
  const { data: uncompleted, loading: loadingUncompleted } = useDataFetch("http://localhost:8080/getuncompletedtasks");
  const { data: reportsTotal, loading: loadingReportsTotal } = useDataFetch("http://localhost:8080/getallreportscount");
  const { data: requestTotal, loading: loadingRequestTotal } = useDataFetch("http://localhost:8080/getallrequestscount");
  const { data: dailyReports, loading: loadingDailyReports } = useDataFetch("http://localhost:8080/reports-today");

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div style={{height:"120vh",backgroundColor:"#000"}} >
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
      <div className="Admindash-container">
        <div className="figures-container">
          <div className="figure-item">
            <h2>Completed Tasks</h2>
            <div className="figure">
              {loadingCompleted ? (
                <ThreeDots color="#fff" height={20} width={20} />
              ) : (
                completed
              )}
            </div>
          </div>
          <div className="figure-item">
            <h2>Daily Reports</h2>
            <div className="figure">
              {loadingDailyReports ? (
                <ThreeDots color="#fff" height={20} width={20} />
              ) : (
                dailyReports
              )}
            </div>
          </div>
          <div className="figure-item">
            <h2>Reports Total</h2>
            <div className="figure">
              {loadingReportsTotal ? (
                <ThreeDots color="#fff" height={20} width={20} />
              ) : (
                reportsTotal
              )}
            </div>
          </div>
          <div className="figure-item">
            <h2>Request Total</h2>
            <div className="figure">
              {loadingRequestTotal ? (
                <ThreeDots color="#fff" height={20} width={20} />
              ) : (
                requestTotal
              )}
            </div>
          </div>
          <div className="figure-item">
            <h2>Uncompleted Requests</h2>
            <div className="figure">
              {loadingUncompleted ? (
                <ThreeDots color="#fff" height={20} width={20} />
              ) : (
                uncompleted
              )}
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
        <div className="barchart1">
          <RequestChart />
        </div>
        <div className="piechart1">
          <MonthlyReportChart />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admindash;
