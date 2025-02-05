/*

Command to deploy:
firebase deploy

Command to run local server (with live updates from input):
npm start

*/

import React, { useState, useCallback, useEffect } from 'react';
import { data, useParams } from "react-router-dom";
import '../App.css';
import './styling/FS_Doc.css';
import Navbar from '../Elements/Navbar.js';
import Footer from '../Elements/Footer.js';
import Doc_Module from '../Elements/Doc_Module.js'
import Module from '../Elements/Module.js';
import ModelViewer from '../Elements/ModelViewer.js';
import Firestore_Listener from '../Firestore_Listener.js';
import GoogleMaps from '../Elements/GoogleMaps.tsx';
import { parseCSV } from '../Elements/dataAnalysis.js';
import { pool_calculator } from './calculator.js';


function FS_Doc() {

  // Page Id
  const { pageId } = useParams();



  // Custom hooks (of interest)
  //const counterVal = 10;
  //const { tempArray, humidArray } = Firestore_Listener(docPath2, "user20@gmail.com", "password5");


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


async function load_flooding(counter) {
    /*
    Algorithm here:
    1. parse pools + of points from downloaded CSV file. Now they should be arrays.
    2. Determine if flooding in pools 2D array (send to calculator.js). Returns new array og 2D pools
    3. Send to <GoogleMaps/> to display markers for 1D array and polygons for 2D array of pools
    4. Done!

    Algorithm 3D map:
    See ModelViewer.js. Essentially translates counter to slidervalue and updates automatically.
    counterFactor needs tinkering with for precision.
    */

    // Step 1
    const relmins = await parseCSV("/Models/test_min.csv"); // 1D array
    const pools = await parseCSV("/Models/test_pool.csv"); // 2D array

    // Step 2
    const flooded_points = await pool_calculator(pools, counter) // 2D Array

    // Step 3

}

  // Overview of flooding
  const  Overview = () => {

    // PART 1
    const { counterVal, lastUpdateVal, nextUpdateVal } = Firestore_Listener("arduino/post", "user20@gmail.com", "password5");
    // NOTE TO SELF: COMBINE INTO ONE?
    const { lastTempVal, lastHumidVal } = Firestore_Listener("arduino/measurements", "user20@gmail.com", "password5");

    // PART 2

    return(
      <>
      <Module type="text">Hello there.<br/><br/>Important information:
      
      <br/><br/>Counter: {counterVal}
      <br/><br/>Last Update Time: {lastUpdateVal}
      <br/><br/>Next Update Time: {nextUpdateVal}
      <br/><br/>Last Humidity Measure: {lastHumidVal}%
      <br/><br/>Last Temperature Measure: {lastTempVal}°C
  
      </Module>
      <br/><br/>
      <Module type="main" title="Statistics">Info</Module>

      <p>Here is a map?:</p>
      <GoogleMaps/>
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
    </head>
    <Navbar pinned="true">{pageId}</Navbar>
    {renderModule()}

    <Footer/>
    </>
  );
};

export default FS_Doc;