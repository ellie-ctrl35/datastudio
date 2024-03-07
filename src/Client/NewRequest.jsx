import React from 'react'
import './Client.css'
import Logo from '../resources/Studio.png'
import { Link } from 'react-router-dom'

const NewRequest = () => {
  return (
    <div className='App'>
        <div className='the-navbar'>
            <div className='logo-cont'>
            <img src={Logo} alt='Studio' />
            <h1>Data Studio</h1>
            </div>
            <div className='navlinks-cont'>
              <Link to='/client/new-request'>New Request</Link>
              <Link to='/client/requests/approved'>Requests</Link>
              <Link to='/client/settings/not-approved'>Settings</Link>
            </div>
        </div>
        <div className='the-bottom'>
            
        </div>
    </div>
  )
}

export default NewRequest