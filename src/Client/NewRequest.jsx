import {useState,useContext} from 'react'
import './Client.css'
import Logo from '../resources/Studio.png'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar';
import { AuthContext } from '../Context/AuthContext';

const NewRequest = () => {
  const {userInfo}= useContext(AuthContext);
  const username = userInfo.
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
              <Avatar round name='Emmanuel Nyatepe' size={40}/>
            </div>
            
        </div>
        <div className='the-bottom'>
            <h2 style={{fontFamily:"Montserrat",color:"white"}}>New Report</h2>
            <p style={{fontFamily:"Montserrat",color:"white",opacity:"0.5",fontSize:"0.9rem"}}>Send a new request now</p>
            <form className='new-request'>
             <label style={{fontFamily:"Montserrat",color:"white",fontSize:"0.8rem",marginTop:"2%"}}>Report Title</label>
             <input placeholder='Enter a Tile for your Request' type='text'/>
             <label style={{fontFamily:"Montserrat",color:"white",fontSize:"0.8rem",marginTop:"2%"}}>Report Type</label>
             <select>
             <option value="" disabled selected>Select one</option>
             <option value="CMreport">CM REPORT</option>
             <option value="PMreport">PM REPORT</option>
             </select>
             <label style={{fontFamily:"Montserrat",color:"white",fontSize:"0.8rem",marginTop:"2%"}}>Label</label>
             <textarea className='desc'/>
             <button style={{fontWeight:700}}>Create Request</button>
            </form>
        </div>
    </div>
  )
}

export default NewRequest