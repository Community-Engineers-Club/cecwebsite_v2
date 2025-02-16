/*

Commands to deploy:
1. npm run build
2. firebase deploy

Command to run local server (with live updates from input):
npm start

*/

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home.js'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import FS_Doc from './pages/FS_Doc.js';
import { AuthProvider } from './authContext/AuthProvider.js';
import GoogleMaps from './elements/GoogleMaps.tsx';
import Editor from './pages/admin.js';


function App() {

// Call the custom hook to start listening

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path ="/advisorysystem/:pageId" element={<FS_Doc/>}/>
        <Route path ="*" element={<FS_Doc/>}/>
        <Route path ="/map" element={<GoogleMaps/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;