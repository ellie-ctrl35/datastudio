import {useContext,useState}from 'react'
import './Engineer.css'
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png';
import Avatar from 'react-avatar';
import axios from 'axios';
import { AuthContext } from "../Context/AuthContext";

const ReportHistory = () => {
  const {userInfo}=useContext(AuthContext);
  const name = userInfo.username;
  return (
    <div className='App'>
       <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont">
          <Link className="navlink" to="/engineers/create-report">
            Create Report
          </Link>
          <Link className="navlink" to="engineers/report-history">
            Reports History
          </Link>
          <Avatar round name={name} size={40} />
        </div>
      </div>
    </div>
  )
}

export default ReportHistory