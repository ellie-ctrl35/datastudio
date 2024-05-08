import { useState, useContext, useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allrequest = () => {
  const { userInfo ,logout} = useContext(AuthContext);
  const name = userInfo.username;
  const email = userInfo.email;
  const [requests, setRequests] = useState([]);
  const [getEngineers, setGetEngineers] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const assignRequest = (engineerUsername, requestId) => {
    axios
      .post("http://localhost:8080/assignrequest", {
        engineerUsername,
        requestId,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Request assigned successfully");
          setUpdateCount((prevCount) => prevCount + 1);
        } else {
          toast.error("Request not assigned");
        }
      })
      .catch((error) => {
        console.error("Error assigning request", error);
        toast.error("Error assigning request");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/getallrequests")
      .then((res) => {
        console.log(res);
        setRequests(res.data.data);
      })
      .catch((error) => console.error("Error fetching requests", error));

    axios
      .get("http://localhost:8080/getallengineers")
      .then((res) => {
        console.log(res);
        setGetEngineers(res.data.data);
      })
      .catch((error) => console.error("Error fetching engineers", error));
  }, [updateCount]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };
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
      <div className="request-container">
        <ul className="request-list">
          {requests.map((request) => (
            <div key={request._id} className="request">
              <h3>{request.title}</h3>
              <p>{request.type}</p>
              <p>{request.author}</p>
              <select
                name="engineer"
                style={{ height: "2rem" }}
                id={`engineer-${request._id}`}
                className="engineer-dropdown"
              >
                {getEngineers.map((engineer) => (
                  <option key={engineer._id} value={engineer.username}>
                    {engineer.username}
                  </option>
                ))}
              </select>
              <button
              className="request-btn"
                onClick={() =>
                  assignRequest(
                    document.getElementById(`engineer-${request._id}`).value,
                    request._id
                  )
                }
              >
                Assign
              </button>
            </div>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Allrequest;
