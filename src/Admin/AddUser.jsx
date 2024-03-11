import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png';
import Avatar from 'react-avatar';

const AddUser = () => {
  return (
    <div>
      <div className='the-navbar'>
            <div className='logo-cont'>
            <img src={Logo} alt='Studio' />
            <h1>Data Studio</h1>
            </div>
            <div className='navlinks-cont'>
              <Link className='navlink' to='/client/new-request'>Dashboard</Link>
              <Link className='navlink' to='/client/requests/approved'>Reports</Link>
              <Link className='navlink' to='/client/requests/not-approved'>All Requests</Link>
              <Link className='navlink' to='/client/requests/not-approved'>Add User</Link>
              <Avatar round name="Emmanuel Nyatepe" size={40}/>
            </div>
        </div>
    </div>
  )
}

export default AddUser