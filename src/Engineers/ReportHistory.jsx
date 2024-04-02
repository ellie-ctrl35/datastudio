import { useContext, useState, useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const ReportHistory = () => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [createdReport, setCreatedReport] = useState([]);
  useEffect(() => {
    // Ensure that 'name' is encoded properly in case of special characters.
    const encodedName = encodeURIComponent(name);

    axios
      .get(`http://localhost:8080/getcreatedreports?name=${encodedName}`)
      .then((res) => {
        console.log(res.data); // Now you can use res.data to display the reports
        setCreatedReport(res.data.data);
        console.log("created Report", createdReport);
      })
      .catch((error) => {
        console.error("Failed to fetch created requests:", error);
      });
  }, [name]);
  return (
    <div className="App">
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
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="bottom-half">
        <div className="head">
          <p>Report ID</p>
          <p>Facility Name</p>
          <p>Serial Number</p>
        </div>
        <ul className="request-list">
          {createdReport.map((report) => (
            <li className="thelist" key={report._id}>
              <p>{report._id}</p>
              <p>{report.FacilityName}</p>
              <p>{report.SerialNumber}</p>
              <Link
                to={{
                  pathname: `/engineers/official-report/${report._id}`,
                  state: { report }, // Passing the entire report object
                }}
              >
                <button className="createbtn">View Report</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportHistory;
