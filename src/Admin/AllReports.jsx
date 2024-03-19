import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png';
import Avatar from 'react-avatar';
import './Admin.css'
import axios from 'axios';
import { AuthContext } from "../Context/AuthContext";

const AllReports = () => {
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
              <Avatar round name="Emmanuel Nyatepe" size={40}/>
            </div>
      </div>
    </div>
  )
}

export default AllReports