/*

Command to deploy:
firebase deploy

Command to run local server (with live updates from input):
npm start

*/

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { data, useParams } from "react-router-dom";
import '../App.css';
import './styling/FS_Doc.css';
import './styling/predict.css';
import Navbar from '../elements/Navbar.js';
import Footer from '../elements/Footer.js';
import Module from '../elements/Module.js';
import ModelViewer from '../elements/ModelViewer.js';
import Firestore_Listener, { getCounter } from '../functions/Firestore_Listener.js';
import GoogleMaps from '../elements/GoogleMaps.tsx';
import { useAuth } from '../authContext/AuthProvider.js';
import Predict from './predict.js';


function FS_Doc() {

  // Page Id
  const { pageId } = useParams();



  // Custom hooks (of interest)
  //const counterVal = 10;
  //const { tempArray, humidArray } = Firestore_Listener(docPath2, "user20@gmail.com", "password5");


  const Doc = () => {
    return(
    <>
    <p>This page is a work in progress.</p>
    </>)
  }

  // Overview of flooding
  const  Overview = () => {

    const { userLoggedIn } = useAuth() // user logged in?

    const [loadMaps, setLoadMaps] = useState(false);
    const [mapsCounter, setMapsCounter] = useState(false);
    const [mapDisconnect, setMapDisconnect] = useState(false);

    // NOTE TO SELF: COMBINE INTO ONE?
    const { counterVal, lastUpdateVal, nextUpdateVal } = Firestore_Listener("arduino/post");
    const { lastTempVal, lastHumidVal } = Firestore_Listener("arduino/measurements");

    useEffect(() => {
      const fetchCounter = async () => {
        if (loadMaps == false) { // need to load map
        try{
          const count = await getCounter();
          setMapsCounter(count);
          setLoadMaps(true);
        } catch(error) {
          console.error("Counter could not be found. Err msg: ", error);
        }
      } else if (mapsCounter != counterVal){ // map loaded, notice change if counter values don't align
        setMapDisconnect(true); // advice user of disconnect
      }

      }

      fetchCounter()

    }, [counterVal])

    return(
      <>
      {!userLoggedIn && <h1>Please note: This page may take some time to load for the first time.</h1>}
      
      <Module type="title" title="2D Maps Represention of 'Pools' of Flooding at SHS"></Module>
      <Module type="text">
        <h2>The 2D embedded Google maps display below highlights areas of flooding in <b>blue polygons.</b> The larger/more dense the pools are,
        the more flooding there is.</h2>
        <br/>
        <p>Other Quick Links:</p>
        <a className="link" href="/advisorysystem/3dmap-warning">3D Map Display</a><br/>
        <a className="link" href="/advisorysystem/predict">Flooding Prediction Calculator</a>
        <br/><br/>
        <b>Please note that it may take some time to load depending on the severity of the flooding level.</b>
        <p>Don't know what this page or system is? Scroll down or <a className="link" href="#resources">click here.</a></p>
      </Module>
      
      {mapDisconnect && <p style={{color: "white", textAlign: "center", backgroundColor: "red"}}><b>There has been a change in the data of the maps display you are currently being shown.
      Please refresh the page to update to the latest version.</b></p>}
      {userLoggedIn && loadMaps && <GoogleMaps/>}

      <br/><br/>
      <Module type="main" title="Technical Data">

      <div className="stat_grid" id="resources">

        <div>
          <div className="bignumber">
          {counterVal}
          </div>
          Counter
        </div>

        <div>
          <div className="bignumber">
          {lastUpdateVal}
          </div>
          Last Update Time
        </div>

        <div>
        <div className="bignumber">
          {lastHumidVal}%
          </div>
          Last Humidity Measure
        </div>

        <div>
        <div className="bignumber">
          {lastTempVal}°C
          </div>
          Last Temperature Measure
        </div>

        <div>
          <div className="bignumber">
          {nextUpdateVal}
          </div>
          Next Update Time
        </div>

      </div>

      </Module>

      <br/>
      <Module type="text">
        <h1 style={{fontSize: "200%"}}>About the Flood Advisory System</h1>
        <br/>
        <b>What is it?</b>
        <p>In late 2023, we sought to find a way to inform faculty and students alike of flooding at Scarsdale High School so we can all get to school and go home safely. We wanted to measure rainfall live onsite and upload this to a website where we can display the rainfall in a visual manner, easily accessible on a website.</p>
        <br/>
        <p>We made the decision to embark on this project after the early dismissal on September 29, 2023, because of how chaotic it was for people to determine where there was flooding and how to travel through the floods safely.</p>
        <br/>
        <p>A little over a year in the making, we have finished version one of our system.</p>
        <br/>
        <b>How does it work?</b>
        <p>Vist our <a className="link" target="_blank" href="https://github.com/Community-Engineers-Club/cecwebsite_v2">GitHub</a> to see our code or read more <b>in the following section</b> to get a jist of how it works. See below to learn how the google maps page above is generated and the thought process behind it.</p>
        <br/>
        <b>This is a cool club! How can I join?</b>
        <p>We'd love to have you join us! To learn more about us and join our group me, <a className="link" href="#footer">click here.</a></p>
      </Module>

      <br/>
      <Module type="text" id="resources">
        <h1 style={{fontSize: "200%"}}>How is the Google Maps page generated?</h1>
        <br/>
        <p>This process involves many steps starting from the physical rain gauge tipping bucket mechanism rotating past a magnet to
           signal rainfall of around 0.08 inches. This action awakes an Arduino Nano ESP32 from a power-saving deep sleep to upload
           this signal as an incremenet to the counter variable along with the current time, humidity, and temperature.

           <br/><br/>
           Remember the goal: we want to translate this counter and distribute it across all of the property and visualize which areas of have flooding.
           Technically, we can divide the property into <b>coordinate pairs of 2-meter resolution</b> with a unique <b>elevation attribute</b>.
           This data can be obtained from the publically available <a className="link" target="_blank" href="https://gis.ny.gov/nys-dem">New York Digital Elevation Model Database.</a> After 
           some conversions, we obtain around 170,000 data points in a .csv file (comma seperated file) ordered by id, elevation, the x-coordinate (longitude), and the y-coordinate(latitude).
           <br/><br/>
           Now, we are getting to an algorithm. To find areas of flooding, we have to determine what areas are the lowest points (or relative minimums) where rainwater will flow to first.
           These minimums are surrounded by increasing elevation that fills with water as it rains more. We want to know the points of these 'pools' and to display the parts of the pools
           filled with water. Ultimately, we end up drawing blue polygons of pools, with each vertex of the polygon being a part of the filled pool, on a Google Maps interface.
        </p>
        <br/>
        <p>To see the technical details of <b>how this all works exactly</b>, feel free to read our code on Github: <a className="link" target="_blank" href="https://github.com/Community-Engineers-Club/cecwebsite_v2">https://github.com/Community-Engineers-Club/cecwebsite_v2</a></p>

      </Module>
      </>
    )
  }

  const show_map = () => {
    return(
      <>
      <Module type="title" title="3D Rendering of Water Level at Scarsdale High School"></Module>
      <Module type="text"><b>Warning: File loading is 80 MB</b></Module>
      <Module type="text">This model is an <i>approximate</i> representation of the water level at Scarsdale High School based on rain measurements taken onsite.</Module>
      <Module type="text"><b>How to use: </b>Use scroll wheel or fingers to zoom in and out and rotate the model.</Module>
      <ModelViewer/>
      <br/>

      <Module type="text" id="resources">
        <h1 style={{fontSize: "200%"}}>How is this 3D map made?</h1>
        <br/>
        <p>This map is able to be shown because of a library that allows 3D models to be embedded and edited by functions. The 3D model was created using a Google Maps API and modified in Blender to fit for displaying on a website.</p>
        <br/><p>The gray plane's height is controlled by a function that maps each increase in counter to an increase in height of the gray plane. The conversion factor has been determined by comparing real precipitation data and images.</p>
        <br/><p>To see the technical details of <b>how this all works exactly</b>, feel free to read our code on Github: <a className="link" target="_blank" href="https://github.com/Community-Engineers-Club/cecwebsite_v2">https://github.com/Community-Engineers-Club/cecwebsite_v2</a></p>

      </Module>
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
      case "predict":
        return Predict()
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