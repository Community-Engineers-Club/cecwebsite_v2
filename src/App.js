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
import Home from './Pages/Home.js'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import FS_Doc from './Pages/FS_Doc.js';
import { AuthProvider } from './contexts/authContext/AuthProvider.js';
import GoogleMaps from './Elements/GoogleMaps.tsx';
import Editor from './Pages/login/Editor.js';


function App() {

// Call the custom hook to start listening

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path ="/advisorysystem/:pageId" element={<FS_Doc/>}/>
        <Route path ="*" element={<b>404 page error. Page does not exist!</b>}/>
        <Route path ="/map" element={<GoogleMaps/>}/>
        <Route path ="/editor" element={<Editor/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;