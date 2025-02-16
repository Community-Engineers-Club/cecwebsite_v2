import React, { useState } from 'react';
import '../App.css';
import Navbar from '../elements/Navbar.js';
import Footer from '../elements/Footer.js';
import Module from '../elements/Module.js';
import './styling/Home.css';

function Home() {

  return (
    <>
    <Navbar/>

{/*
<div style={{background: "linear-gradient(to right, rgb(244, 5, 5), rgb(244, 5, 128))", padding: "5px",
  paddingTop: "10px",
  paddingBottom: "10px",
  textAlign: "center",
  }}>
  <p style={{fontWeight: "bold", color: "white"}}>How's the water level right now at SHS?
  &nbsp;
  <a style={{textDecoration: "none", color: "yellow"}}href="/advisorysystem/overview">Click here!</a>

  </p>
</div> */}


<section className="widget" style={{backgroundImage: "url('/Images/adsystem.jpeg')"}}>
<div className="widget_overlay">
  <div className="widget_text">
    <h1>Flood Advisory System</h1>
    <p>Device measures rainfall onsite at Scarsdale High School and calculates
      estimated water level (flooding) on school property.<br/><br/><b>Finalized January 2025</b></p>
    <nav className="widget_menu">
      <a href="/advisorysystem/overview" className="opt1">Overview</a>
      <a href="/advisorysystem/predict" className="opt2">Calculate Flooding</a>
    </nav>
  </div>
  </div>
</section>


{/* Introduction widget
<div className="intro_gradient">
  <h1 style={{
  }}>The Community Engineers Club</h1>
</div> */}

<div style={{marginTop: "2px", marginBottom: "2px"}}>
<a href="#footer" style={{textDecoration: "none", color: "white"}}>
  <p style={{ borderRadius: "4px", textAlign: "center", width: "100%", margin: "auto", background: "rgb(27, 126, 225)"}} href="#footer">&#9660;</p>
</a>
</div>



    <body>

    </body>

    <Footer/>
    </>
  );
}

export default Home;