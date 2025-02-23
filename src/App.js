import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home.js'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import FS_Doc from './pages/FS_Doc.js';
import { AuthProvider } from './authContext/AuthProvider.js';
import Fullscreen from './pages/Fullscreen.js';


function App() {

// Call the custom hook to start listening

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path ="/advisorysystem/:pageId" element={<FS_Doc/>}/>
        <Route path ="/advisorysystem" element={<Navigate to="/advisorysystem/overview" replace/>}/>
        <Route path ="*" element={<FS_Doc/>}/>
        <Route path ="/fullscreen/:pageId" element={<Fullscreen/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;