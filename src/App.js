import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
