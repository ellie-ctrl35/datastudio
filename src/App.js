import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Auth/Login';
import NewRequest from './Client/NewRequest';
import {AuthContext} from './Context/AuthContext';
import {useContext} from 'react';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
