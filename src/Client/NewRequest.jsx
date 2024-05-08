import { useState, useContext } from "react";
import "./Client.css";
import Logo from "../resources/Studio.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewRequest = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const email = userInfo.email;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sendRequest = (e) => {
    e.preventDefault();
    if (!title || !desc || !type) {
      toast.info("Please fill in all fields.");
      return;
    }
    const data = {
      title,
      desc,
      type,
      author: email,
    };
    console.log(data);
    axios.post("http://localhost:8080/sendrequest", data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        toast.success("Request sent successfully");
        setTitle("");
        setDesc("");
        setType("");
      } else if (res.status === 500) {
        toast.error("Request not sent");
      }
    });
  };

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
      <div className="the-bottom">
        <h2 style={{ fontFamily: "Montserrat", color: "white" }}>
          New Request
        </h2>
        <p
          style={{
            fontFamily: "Montserrat",
            color: "white",
            opacity: "0.5",
            fontSize: "0.9rem",
          }}
        >
          Send a new request now
        </p>
        <form className="new-request" onSubmit={sendRequest}>
          <label
            style={{
              fontFamily: "Montserrat",
              color: "white",
              fontSize: "0.8rem",
              marginTop: "2%",
            }}
          >
            Request Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a Tile for your Request"
          />
          <label
            style={{
              fontFamily: "Montserrat",
              color: "white",
              fontSize: "0.8rem",
              marginTop: "2%",
            }}
          >
            Request Type
          </label>
          <select onChange={(e) => setType(e.target.value)} value={type}>
            <option value="" disabled>
              Select one
            </option>
            <option value="CMReport">CM REPORT</option>
            <option value="PMReport">PM REPORT</option>
            <option value="PPMReport">PPM REPORT</option>
            <option value="regular">Regular</option>
          </select>

          <label
            style={{
              fontFamily: "Montserrat",
              color: "white",
              fontSize: "0.8rem",
              marginTop: "2%",
            }}
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your report..."
            maxLength="200"
            className="desc"
            style={{ fontFamily: "Montserrat", color: "white" }}
          ></textarea>

          <button style={{ fontWeight: 700 }}>Create Request</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewRequest;

