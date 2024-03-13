import {useState,useContext,useEffect} from 'react'
import './Admin.css'
import { Link } from 'react-router-dom';
import Logo from '../resources/Studio.png';
import Avatar from 'react-avatar';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allrequest = () => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo.username;
  const [requests, setRequests] = useState([]);
  const [getEngineers, setGetEngineers] = useState([]);

  const assignRequest = (e) => {
    e.preventDefault();
    const engineer = e.target[0].value;
    const title = e.target[1].value;
    axios.post("http://localhost:8080/assignrequest", { engineer, title })
      .then(res => {
        console.log(res);
        if(res.status === 200){
          toast.success("Request assigned successfully");
        } else {
          toast.error("Request not assigned")
        }
      }
    )
      .catch(error => console.error("Error assigning request", error));
  }

  useEffect(() => {
    axios.get("http://localhost:8080/getallrequests")
      .then(res => {
        console.log(res);
        setRequests(res.data.data)
      })
      .catch(error => console.error("Error fetching requests", error));

    axios.get("http://localhost:8080/getallengineers")
      .then(res => {
        console.log(res);
        setGetEngineers(res.data.data)
      })
      .catch(error => console.error("Error fetching engineers", error));
  }, []);
  return (
    <div className='App'>
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
              <Avatar round name={name} size={40}/>
            </div>
        </div>
        <div className='request-container'>
   <ul className='request-list'>
        {requests.map((request, index) => (
            <div key={index} className='request'>
                <h3>{request.title}</h3>
                <p>{request.type}</p>
                <p>{request.author}</p>
                {
                  getEngineers.map((engineer, index) => (
                    <select key={index} name='engineer'  id='engineer'>
                        <option value={engineer.username}>{engineer.username}</option>
                    </select>
                  ))
                }
                <button onClick={assignRequest}>Assign</button>
            </div>
        ))}
   </ul>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Allrequest;