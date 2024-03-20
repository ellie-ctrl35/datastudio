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
  const [assignedRequest,setAssignedRequest] = useState([]);

  useEffect(() => {
    // Ensure that 'name' is encoded properly in case of special characters.
    const encodedName = encodeURIComponent(name);
  
    axios.get(`http://localhost:8080/getassignedrequest?name=${encodedName}`)
      .then((res) => {
        console.log(res.data); // Now you can use res.data to display the reports
        setAssignedRequest(res.data.data);
        console.log("assigned Request",assignedRequest)
      })
      .catch((error) => {
        console.error("Failed to fetch assigned requests:", error);
      });
  }, [name]); // Depend on 'name' to re-fetch if it changes
  
  
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
          {assignedRequest.map((request) => (
            <li className="thelist" key={request._id}>
              <p>{request._id}</p>
              <p>{request.type}</p>
              <p>{request.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateReport;
