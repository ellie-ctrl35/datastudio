import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Auth/Login';
import NewRequest from './Client/NewRequest';

function App() {
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
