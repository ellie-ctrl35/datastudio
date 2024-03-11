import { useState, useContext } from "react";
import "./Client.css";
import Logo from "../resources/Studio.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const NewRequest = () => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");

  const sendRequest = (e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
      type,
      author: name,
    };
    console.log(data);
    axios.post("http://localhost:4000/sendrequest", data).then((res) => {
      console.log(res);
    });
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
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="the-bottom">
        <h2 style={{ fontFamily: "Montserrat", color: "white" }}>New Report</h2>
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
            Report Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a Tile for your Request"
            type="text"
          />
          <label
            style={{
              fontFamily: "Montserrat",
              color: "white",
              fontSize: "0.8rem",
              marginTop: "2%",
            }}
          >
            Report Type
          </label>
          <select onChange={(e) => setType(e.target.value)} value={type}>
  <option value="" disabled>Select one</option>
  <option value="CMReport">CM REPORT</option>
  <option value="PMReport">PM REPORT</option>
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
            style={{ fontFamily: "Montserrat", color: "white" }} // Add more styling as needed
          ></textarea>

          <button style={{ fontWeight: 700 }}>Create Request</button>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
