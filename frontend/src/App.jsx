import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import NewBill from './pages/NewBill';
import BillDetail from './pages/BillDetail';
import Clients from './pages/Clients';
import NewClient from './pages/NewClient';
import ClientDetail from './pages/ClientDetail';
import Settings from './pages/Settings';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Landing from './pages/landing/Landing';
import Terms from './components/Landingpage/Terms';
import Privacy from './components/Landingpage/Privacy';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <div className={user ? 'pt-16' : ''}>
        <Routes>

          {/* Landing page — public */}
          <Route path="/" element={
            user ? <Navigate to="/dashboard" /> : <Landing />
          } />

          {/* Auth routes */}
          <Route path="/login" element={
            !user ? <Login /> : <Navigate to="/dashboard" />
          } />
          <Route path="/register" element={
            !user ? <Register /> : <Navigate to="/dashboard" />
          } />

          {/* Private routes */}
          <Route path="/dashboard" element={
            <PrivateRoute user={user}><Dashboard /></PrivateRoute>
          } />
          <Route path="/bills" element={
            <PrivateRoute user={user}><Bills /></PrivateRoute>
          } />
          <Route path="/bills/new" element={
            <PrivateRoute user={user}><NewBill /></PrivateRoute>
          } />
          <Route path="/bills/:id" element={
            <PrivateRoute user={user}><BillDetail /></PrivateRoute>
          } />
          <Route path="/clients" element={
            <PrivateRoute user={user}><Clients /></PrivateRoute>
          } />
          <Route path="/clients/new" element={
            <PrivateRoute user={user}><NewClient /></PrivateRoute>
          } />
          <Route path="/clients/:id" element={
            <PrivateRoute user={user}><ClientDetail /></PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute user={user}><Settings /></PrivateRoute>
          } />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;