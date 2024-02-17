import React from 'react'
import {Routes,Route, Navigate } from "react-router-dom"
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'
import AccessDenied from '../components/AccessDenied'
import { isAuthenticated } from '../auth.js';

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <AccessDenied/>
  );
};
const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />}>
        Sign Up
      </Route>
      <Route path="/login" element={<Login />}>
        Login
      </Route>
      <Route path="/dashboard" element={<PrivateRoute element={<Home />} />}>
        Dashboard
      </Route>
    </Routes>
  )
}

export default Allroutes