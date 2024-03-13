import {useState,useContext} from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png';
import Avatar from 'react-avatar';
import axios from 'axios';
import { AuthContext } from "../Context/AuthContext";

const Admindash = () => {
  const {userInfo} = useContext(AuthContext);
  const name = userInfo.username;
  return (
    <div className='App'>
        <div className='the-navbar'>
            <div className='logo-cont'>
            <img src={Logo} alt='Studio' />
            <h1>Data Studio</h1>
            </div>
            <div className='navlinks-cont'>
              <Link className='navlink' to='/admin/dashboard'>Dashboard</Link>
              <Link className='navlink' to='/admin/all-reports'>Reports</Link>
              <Link className='navlink' to='/admin/all-requests'>All Requests</Link>
              <Link className='navlink' to='/admin/add-user'>Add User</Link>
              <Avatar round name={name} size={40}/>
            </div>
        </div>
        <div className='Admindash-container'>
          <div className='figures-container'></div>
          <div className='chart-container'></div>
        </div>
    </div>
  )
}

export default Admindash