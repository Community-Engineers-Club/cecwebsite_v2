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
import { doc } from 'firebase/firestore';
import ModelViewer from './Elements/ModelViewer.js';
import Firestore_Listener from './Firestore_Listener.js';
import {db} from './Firebase.js';
import FS_Doc from './Pages/FS_Doc.js';

const postRef = doc(db, 'arduino', 'post');

function App() {

const docPath1 = "arduino/post";

// Call the custom hook to start listening
const { counterVal } = Firestore_Listener(docPath1, "user20@gmail.com", "password5");

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path ="/advisorysystem/:pageId" element={<FS_Doc/>}/>
        <Route path ="*" element={<b>404 page error. Page does not exist!</b>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

/*

App archive:
    <title>App</title>
    <Navbar/>
    <div className="App">
      <p>Hi, this is a test.</p>
      <Counter>{counterVal}</Counter>
      <ModelViewer/>
      </div>

*/

function Model(){
return(
<>
<body className="ThreeDModel">
  <input type="range" id="slider" min="0" max="10" step="0.1" value="5" />
  <script src="https://cdn.jsdelivr.net/npm/three@latest/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@latest/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@latest/examples/js/controls/OrbitControls.js"></script>
  <script src="./Elements/Model.js"></script>
</body>
</>
)
}

function Counter({ children }) {
return(
  <>
  <h1>Counter: {children}</h1>
  </>
)
}

export default App;