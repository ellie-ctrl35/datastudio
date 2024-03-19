import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Auth/Login';
import NewRequest from './Client/NewRequest';
import CRequest from './Client/CRequest';
import NRequest from './Client/NRequest';
import Admindash from './Admin/Admindash';
import AllReports from './Admin/AllReports';
import AddUser from './Admin/AddUser';
import Allrequest from './Admin/Allrequest';
import CreateReport from './Engineers/CreateReport';
import ReportHistory from './Engineers/ReportHistory';
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
        {
          userToken ? (
             userInfo.role === "client" ? (
              <>
              <Route path="/client/new-request" element={<NewRequest />} />
              <Route path='/client/requests/approved' element={<CRequest/>}/>
              <Route path='/client/requests/not-approved' element={<NRequest/>}/>
              <Route path="/" element={<Navigate replace to="/client/new-request" />} />
              </>
             ) : userInfo.role === "engineer" ? (
              <>
              <Route path="/engineers/create-report" element={<CreateReport />} />
              <Route path="/engineers/report-history" element={<ReportHistory />} />
              <Route path="/" element={<Navigate replace to="/engineers/report-history" />} />
              </>
             ) : (
              <>
                <Route path="/admin/dashboard" element={<Admindash />} />
                <Route path="/admin/all-reports" element={<AllReports />} />
                <Route path="/admin/add-user" element={<AddUser />} />
                <Route path="/admin/all-requests" element={<Allrequest />} />
                <Route path="/" element={<Navigate replace to="/admin/dashboard" />} />
              </>
              )

          ):(
            <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
