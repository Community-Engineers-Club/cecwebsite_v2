//Styling
import React from 'react';
import './styling/Nav_styling.css';
import '../App.css';

  // Subheader renderer
  function render_subheader(page_link) {
    switch(page_link){
      case "overview":
        return "Overview";
      case "documentation":
        return "Documentation"
      case "3dmap":
        return "3D Map"
      case "3dmap-warning":
        return "3D Map: Warning"
      case "history":
        return "History"
      default:
        return "Home"
    }
}

//Navbar HTML Code
function Navbar(props){

/*

Props:
props.pinned (if pinned message)

*/

return(

<>
<head>
    <title>{render_subheader(props.children)} | CEC </title>
</head>
    <div className="nav-background">
    <nav className="navbar">
    
    <div className="nav_left">
    <a href="/"><img className="nav_logo" src="/Images/celogo.png"></img></a>
    <h1 className="web_name">Community Engineers</h1>
    </div>

    <div className="nav_right">
    <a className="page" href="/">Home</a>
    <div className="nav_vert"></div>
        <div className="dropdown">
            <a className="page" href="/advisorysystem/overview">Flood Advisory System &#x25BE;</a>
            <div className="dropdown-content">
                <a href="/advisorysystem/overview">Overview</a>
                <a href="/advisorysystem/3dmap-warning">3D Map</a>
                <a href="/advisorysystem/history">History</a>
                <div style={{width: "90%", height: "1px", background: "lightgray", justifySelf: "center"}}></div>
                <a href="/advisorysystem/documentation">Documentation</a>
            </div>
        </div>
            <div className="nav_vert"></div>
            <a className="page" href="/#about_link">About</a>
            <div className="nav_vert"></div>
            <a className="page" href="#footer">Join</a>


    </div>
    </nav>
    <div className="horizontal_bar"></div>

    {
    /* Add pinned segment if pinned == true*/
    props.pinned === "true" &&
        <section className="pinned">
            <p>{render_subheader(props.children)}</p>
        </section> }

    </div>
</>
)
}

export default Navbar