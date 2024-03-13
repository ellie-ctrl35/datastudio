import { useState, useContext ,useEffect} from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [added, setAdded] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then(res => {
        console.log(res);
        setUsers(res.data.data)
      })
      .catch(error => console.error("Error fetching users", error));
  }, [added]);

  const createUser = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:8080/register", { username, email, password, phone, role })
      .then(res => {
        console.log(res);
        setAdded(res.data);
        if(res.status === 200){
          toast.success("User added successfully");
        } else {
          toast.error("User not added")
        }
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
        e.target[4].value = "";
      })
      .catch(error => console.error("Registration error in InfoContext", error));
  }
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
          <Avatar round name={name} size={40} />
        </div>
      </div>

      <div className="adduser-bottom">
         <ul className="userlist">
          {
            users.map((user, index) => {
              return (
                <div key={index} className="user">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.role}</p>
                </div>
              )
            })
          }
         </ul>
         <div className="userform">
            <h1>Add User</h1>
            <form onSubmit={createUser}>
              <label>Username</label>
              <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
              <label>Email</label>
              <input  onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" />
              <label>Password</label>
              <input  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
              <label>Phone</label>
              <input  onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="Phone" />
              <label>Role</label>
              <select onChange={(e)=>setRole(e.target.value)}>
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