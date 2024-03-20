import { useContext } from "react";
import "./Client.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import { AuthContext } from "../Context/AuthContext";

const CRequest = () => {
  const { userInfo,logout } = useContext(AuthContext);
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
          <button onClick={()=>logout()}>Logout</button>
          <Avatar round name="Emmanuel Nyatepe" size={40} />
        </div>
      </div>
      <div className="table-list">
        <h2 style={{ fontFamily: "Montserrat", color: "white" }}>
          Confirmed Requests
        </h2>
        <ul className="listbox">
          <div className="list-item">
            <h3>Report ID</h3>
            <p>Report Title</p>
            <p>Report Type</p>
            <p>Report Status</p>
            <p>Assigned To</p>
          </div>
          <div className="item"></div>
        </ul>
      </div>
    </div>
  );
};

export default CRequest;
