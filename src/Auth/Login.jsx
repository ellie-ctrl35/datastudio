import { useContext, useState, useEffect } from "react";
import "./Auth.css";
import Logo from "../resources/Studio.png";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, logout, error, setError,isCredentialsLegit } = useContext(AuthContext); // Added error from context
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(`Login error: ${error.message}`); // Display error toast
      setError(null); // Reset error state
    } else if (isCredentialsLegit) {
      navigate("/"); // Navigate to the desired route after successful login
      toast.success("Login successful");
    }
  }, [error, setError, isCredentialsLegit, navigate]);
  const loginUser = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.info("Please fill in all fields"); // Display error toast
      return; // Prevent login function from running
    }

    Login(email, password)
    .catch((err) => {
      console.log("Login error: from Login.jsx", err);
    });
  };

  return (
    <div className="main">
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
      </div>
      <div className="the-form">
        <h1>Log in</h1>
        <p>Enter your credentials to access the data studio</p>
        <form onSubmit={loginUser}>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email@example.com"
          />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
