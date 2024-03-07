import React from 'react'
import './Client.css'
import Logo from '../resources/Studio.png'

const NewRequest = () => {
  return (
    <div className='App'>
        <div className='the-navbar'>
            <div className='logo-cont'>
            <img src={Logo} alt='Studio' />
            <h1>Data Studio</h1>
            </div>
            <div className='navlinks-cont'>

            </div>
        </div>
        <div className='the-bottom'>
            
        </div>
    </div>
  )
}

export default NewRequest