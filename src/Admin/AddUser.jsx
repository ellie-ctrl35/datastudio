import { useState, useContext, useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

const AddUser = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const name = userInfo.username;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [added, setAdded] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching users", error);
        setLoading(false);
      });
  }, [added]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const createUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/register", {
        username,
        email,
        password,
        phone,
        role,
      })
      .then((res) => {
        console.log(res);
        setAdded(res.data);
        if (res.status === 200) {
          toast.success("User added successfully");
        } else {
          toast.error("User not added");
        }
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
        e.target[4].value = "";
      })
      .catch((error) =>
        toast.error("Registration error in InfoContext", error)
      );
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

      <div className="adduser-bottom">
        {loading ? (
          <ThreeDots color="dodgerblue" width={120} height={120} />
        ) : (
          <ul className="userlist">
            {users.map((user, index) => {
              return (
                <div key={index} className="user">
                  <h3 style={{ width: "30%" }}>{user.username}</h3>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.role}</p>
                </div>
              );
            })}
          </ul>
        )}

        <div className="userform">
          <h1 style={{ fontFamily: "Montserrat" }}>Add User</h1>
          <form onSubmit={createUser}>
            <label>Username</label>
            <input
              className="userform-input"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <label>Email</label>
            <input
              className="userform-input"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <label>Password</label>
            <input
              className="userform-input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <label>Phone</label>
            <input
              className="userform-input"
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone"
            />
            <label>Role</label>
            <select
              className="userform-input"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="engineer">Engineer</option>
              <option value="client">Client</option>
            </select>
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
