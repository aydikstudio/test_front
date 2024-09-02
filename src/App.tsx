import React, { useEffect, useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import { Auth } from './pages/auth';
import { Home } from './pages/home';

import { NotFound } from './pages/notFound';
import Header from './components/header';
import { Container } from '@mui/material';
import axios from 'axios';


function App() {

 const [user, setUser]  =  useState(JSON.parse(localStorage.getItem('user') ||  '{}'));



  useEffect(() => {


    checkAuth();

    if (!user.name  && window.location.pathname != '/auth') {
      window.location.href = "/auth";
  
    } 

    

    if(user.name  && window.location.pathname == '/auth') {

      window.location.href = "/";
    }
  }, [])



  const checkAuth = async() => {
  
    try {
      const data = await axios.get(process.env.REACT_APP_API_URL+'/users/me', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
  
    } catch(e) {
      // localStorage.clear()
    }
  }



  return (


    <div>
      <Header />
      <Container maxWidth="lg" sx={{
        marginTop: '20px'
      }}>
        <Routes>

          <Route path='/auth' element={<Auth />} />

          <Route path='/' element={<Home />} />



          <Route path="*" element={<NotFound />} />

        </Routes>
      </Container>
    </div>

  );
}

export default App;
