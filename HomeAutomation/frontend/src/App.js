import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import LandingPage from './components/LandingPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NewDashboard from './components/NewDashboard';
import ChangePassword from './components/ChangePassword';
import ChangeEmail from './components/ChangeEmail';
import About from './components/About';
import Help from './components/Help';
import Support from './components/Support';
import Products from './components/Products';


function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/support" element={<Support />} />
                <Route path="/ChangePassword" element={user ? <ChangePassword user={user} /> : <Navigate to="/login" />} />
                <Route path="/ChangeEmail" element={user ? <ChangeEmail user={user} /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={user ? <NewDashboard user={user} /> : <Navigate to="/login" />} />
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
