import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ProtectedRoute(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    },[navigate])
  return (
    <Component/>
  )
}

export default ProtectedRoute