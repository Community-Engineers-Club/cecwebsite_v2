/*

Command to deploy:
firebase deploy

Command to run local server (with live updates from input):
npm start

*/

import React from 'react';
import { useParams } from "react-router-dom";
import '../App.css';
import './styling/FS_Doc.css';
import Navbar from '../Elements/Navbar.js';
import Footer from '../Elements/Footer.js';
import Doc_Module from '../Elements/Doc_Module.js'
import Module from '../Elements/Module.js';
import ModelViewer from '../Elements/ModelViewer.js';
import Firestore_Listener from '../Firestore_Listener.js';
import Graph from '../Elements/Graph.js';


function FS_Doc() {

  // Page Id
  const { pageId } = useParams();


  // Firestore Database
  const docPath1 = "arduino/post";
  const docPath2 = "arduino/measurements";
  // Custom hooks (of interest)
  const { counterVal, lastUpdateVal, nextUpdateVal, lastMemoryClearVal, nextMemoryClearVal } = Firestore_Listener(docPath1, "user20@gmail.com", "password5");
  const { tempArray, humidArray } = Firestore_Listener(docPath2, "user20@gmail.com", "password5");



  const Doc = () => {
    return(
    <>
        <body>
      <div className="home_body">

      <div className="glitchBar"></div>
      <Doc_Module title="Introduction" type="dark" color="rgb(244, 5, 5)"/>

      <br/>
      <Doc_Module title="test2" type="light" color="rgb(0, 255, 0)">Hello, hi.<br/>Next</Doc_Module>

      </div>

    </body>
    </>)
  }

  const Overview = () => {
    return(
      <>
      <Module type="text">Hello there.<br/><br/>Important information:
      
      <br/><br/>Counter: {counterVal}
      <br/><br/>lastUpdate: {lastUpdateVal}

      <br/><br/>nextUpdate: {nextUpdateVal}
      <br/><br/>lastMemoryClear: {lastMemoryClearVal}
      <br/><br/>nextMemoryClear: {nextMemoryClearVal}

      <ul>
          {tempArray.map((temp, index) => (
            <li key={index}>{index}: {temp}</li>
          ))}
       </ul>

        {/* Graph testing */}
        <Graph array= {tempArray} type="Temperature"/>

  
      </Module>
      <br/><br/>
      <Module type="main" title="Statistics">Info</Module>
      </>
    )
  }

  const show_map = () => {
    return(
      <>
      <Module type="text"><b>Warning: File loading is 80 MB</b></Module>
      <Module type="title" title="3D Rendering of Water Level at Scarsdale High School"></Module>
      <Module type="text">Please note that the model is only <i>approximate</i> and does not exactly represent the water level.</Module>
      <Module type="text"><b>How to use: </b>Use scroll wheel or fingers to zoom in and out and rotate the model.</Module>
      <ModelViewer/>
      <br/><br/>
      </>
    )
  }

  const warning_map = () => {
    return(
      <>
      <Module type="text"><b>Warning: 3D rendering file is 80 MB (megabytes).<br/><br/>This may  take some time to load. This may be intensive and slow down some devices. Speed of download is dependent upon internet connection.</b></Module>
      <Module type="text"><b>Are you sure you want to continue?</b><br/><br/><a href="/advisorysystem/3dmap" style={{textDecoration: "none", color: "green"}}>Yes</a>      
      <br/><br/><a style={{textDecoration: "none", color: "red"}} href="/">No, take me home!</a></Module>
      </>
    )
  }

  const history = () => {
    return(
      <>
      <Module type="title" title="History has yet to be written. Coming soon."></Module>
      <br/>
      <Module type="image" src="/Images/celogo.png" width="30%" position="center"></Module>
      <br/><br/>
      </>
    )
  }


  // Page renderer
  const renderModule = () => {
    switch(pageId){
      case "documentation":
        return Doc()
      case "overview":
        return Overview()
      case "3dmap":
        return show_map()
      case "3dmap-warning":
        return warning_map()
      case "history":
        return history()
      default:
        return <h1>An error has occured.</h1>
    }

  }

  return (
    <>
    <head>
    <title>Home</title>
    </head>
    <Navbar pinned="true">{pageId}</Navbar>
    {renderModule()}
    <Footer/>
    </>
  );
}

export default FS_Doc;