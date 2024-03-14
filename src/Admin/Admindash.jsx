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
  <div className='figures-container'>
    <div className='figure-item'>
      <h2>Completed Tasks</h2>
      <div className='figure'>
        <span className='figure-main'>2</span>
        <span className='figure-sub'>/ 5</span>
      </div>
    </div>
    <div className='figure-item'>
      <h2>Total Balance</h2>
      <div className='figure'>
        <span className='figure-main'>1.592</span>
        <div className='figure-bar-chart'></div> 
      </div>
    </div>
    <div className='figure-item'>
      <h2>MJ Fast Hours</h2>
      <div className='figure'>
        <span className='figure-main'>6.9</span>
        <span className='figure-sub'>/ 15H</span>
      </div>
    </div>
  </div>
  <div className='chart-container'>
    <div className='chart-item'>
      <div className='chart-api-usage'>
        <h2>ChatGPT API Usage</h2>
        <div className='chart-circle'></div>
      </div>
    </div>
    <div className='chart-item'>
      <div className='chart-work-life-balance'>
        <h2>Work-Life Balance</h2>
        <div className='chart-circle'></div>
      </div>
    </div>
    <div className='chart-item'>
      <div className='chart-custom-dashboard'>
        <h2>Custom Dashboard</h2>
        <span>10/20 Templates</span>
        <div className='chart-navigation'></div> 
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Admindash