import {useContext, useState} from 'react'
import './Auth.css'
import Logo from '../resources/Studio.png'
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("")
  const {Login,logout}=useContext(AuthContext);
  const navigate =useNavigate();

  const loginUser = (e) =>{
    e.preventDefault();
        Login(email, password)
          .then(() => {
            navigate('/client/new-request'); // Navigate to the desired route after successful login
          })
          .catch(err => {
            console.log('Login error: from Login.jsx', err);
          });
  }
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
        <form onSubmit={loginUser}>
          <label>Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='email@example.com' />
          <label>Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password' />
          <button type='submit'>Login</button>
        </form>
      </div>
      <button onClick={()=>logout()}>Log out</button>
    </div>
  )
}

export default Login