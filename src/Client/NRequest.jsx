import React from 'react'
import './Client.css';
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png'

const NRequest = () => {
  return (
    <div className='App'>
    <div className='the-navbar'>
        <div className='logo-cont'>
        <img src={Logo} alt='Studio' />
        <h1>Data Studio</h1>
        </div>
        <div className='navlinks-cont'>
          <Link className='navlink' to='/client/new-request'>New Request</Link>
          <Link className='navlink' to='/client/requests/approved'>Confirmed Requests</Link>
          <Link className='navlink' to='/client/requests/not-approved'>Pending Requests</Link>
        </div>
    </div>
    <div className='the-bottom'>
        
    </div>
</div>
  )
}

export default NRequest