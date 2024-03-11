import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Auth/Login';
import NewRequest from './Client/NewRequest';
import CRequest from './Client/CRequest';
import NRequest from './Client/NRequest';
import Admindash from './Admin/Admindash';
import AllReports from './Admin/AllReports';
import {AuthContext} from './Context/AuthContext';
import {useContext,useEffect} from 'react';

function App() {
  const { userToken, userInfo, isLogged } = useContext(AuthContext);

  useEffect(() => { 
    isLogged(); 
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/client/new-request" element={<NewRequest />} />
        <Route path='/client/requests/approved' element={<CRequest/>}/>
        <Route path='/client/requests/not-approved' element={<NRequest/>}/>

        <Route path="/admin/dashboard" element={<Admindash />} />
        <Route path="/admin/all-reports" element={<AllReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
