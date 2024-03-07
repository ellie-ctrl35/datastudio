import React from 'react'
import './Auth.css'
import Logo from '../resources/Studio.png'

const Login = () => {
  return (
    <div className='main'>
      <div className='the-navbar'>
        <div className='logo-cont'>
          <img src={Logo} alt='Studio' />
          <h1>Data Studio</h1>
        </div>
      </div>
      <div className='the-form'>
        <h1>Log in</h1>
        <p>Enter your credentials to access the data studio</p>
        <form>
          <label>Email</label>
          <input type='text' placeholder='email@example.com' />
          <label>Password</label>
          <input type='password' placeholder='password' />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login