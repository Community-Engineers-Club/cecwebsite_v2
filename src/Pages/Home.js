/*

Command to deploy:
firebase deploy

Command to run local server (with live updates from input):
npm start

*/

import React, { useState } from 'react';
import '../App.css';
import Navbar from '../Elements/Navbar.js';
import Footer from '../Elements/Footer.js';
import Module from '../Elements/Module.js';
import './styling/Home.css';


function Home() {


  return (
    <>
    <title>App</title>
    <Navbar/>

<div style={{background: "linear-gradient(to right, rgb(244, 5, 5), rgb(244, 5, 128))", padding: "5px",
  paddingTop: "10px",
  paddingBottom: "10px",
  textAlign: "center",
  }}>
  <p style={{fontWeight: "bold", color: "white"}}>How's the water level right now at SHS?
  &nbsp;
  <a style={{textDecoration: "none", color: "yellow"}}href="/advisorysystem/overview">Click here!</a>

  </p>
</div>

{/* Introduction widget  */}
<div className="intro_gradient">
  <h1 style={{
  }}>The Community Engineers Club</h1>
</div>

<div id="about_link"></div>
<Module type="main" title="About the Community Engineers Club!"
>a non-competitive collaborative environment, encouraging people of various interests (ranging from art to programming) to meet and utilize their skill sets to create products for the school, local community, and beyond. We wanted to offer an alternative option (as the only other engineering club was the Robotics club) for students interested in engineering to really get a chance to explore the field.</Module>

<br/><br/>
<Module type="title" title="PROJECTS"></Module>


<section className="widget" style={{backgroundImage: "url('/Images/gaugev2.png')"}}>
<div className="widget_overlay">
  <div className="widget_text">
    <h1>Flood Advisory System</h1>
    <p>Device measures rainfall onsite at Scarsdale High School and calculates
      estimated water level (flooding) on school property.<br/><b>Installed December 2024</b></p>
    <nav className="widget_menu">
      <a href="/advisorysystem/overview" className="opt1">Overview</a>
      <a href="/advisorysystem/history" className="opt2">See History</a>
    </nav>
  </div>
  </div>
</section>




    <body>

    </body>

    <Footer/>
    </>
  );
}

export default Home;