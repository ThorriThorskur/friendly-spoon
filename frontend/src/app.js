import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './FrontPage/frontpage';
import Login from './LoginPage/login';
import Register from './RegisterPage/register';
import Search from './SearchPage/search';
import Settings from './SettingsPage/settings';
import Wishlist from './WishlistPage/wishlist';
import ProtectedRoute from './xComps/Gatekeeper';
import Banner from './xComps/Banner';

const App = () => {
  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<FrontPage />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
