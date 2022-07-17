import React from 'react';
import Navbar from './components/shared/Navbar';
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
function App() {

  const location = useLocation();
  console.log(location)

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
