import React from 'react';
import Header from '../pages/Header';
import HdrData from '../ApiData/menulist';
import { Navigate, Outlet } from "react-router-dom";
function PrivateComponents() {
  const auth = sessionStorage.getItem('user');
  return auth ?
    <div className='d-flex'>
      <Header menudata={HdrData} />
      <Outlet />
    </div>
    : <Navigate to="/" />
}

export default PrivateComponents