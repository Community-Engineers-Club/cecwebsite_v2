import React from 'react';
import './styling/Footer_styl.css'

function Footer(){

return(
<>
<div id="footer">

<div style={{borderLeft: "2px solid whitesmoke", padding: "10px", justifySelf:"center", maxWidth: "900px", width: "80%", lineHeight: "1.3"}}>
  <h1>About the Community Engineers</h1>
  <p>a non-competitive collaborative environment, encouraging people of various interests (ranging from art to programming) to meet and utilize their skill sets to create products for the school, local community, and beyond. We wanted to offer an alternative option (as the only other engineering club was the Robotics club) for students interested in engineering to really get a chance to explore the field.</p>
</div>
<br/><br/>

<div className="foot_top">
<div className="foot_left">
  <img className="groupme" src="/Images/groupme.png"></img>
  <br/>
  <p>Join our Group Me!</p>

</div>
<div className="foot_right">
  <b>Meeting Times</b>
  <br/><br/>
  <b>Day</b><br/>
  <p>Wednesdays</p><br/>

  <b>Time</b><br/>
  <p>3pm</p><br/>

  <b>Location</b>
  <p>The Design Lab</p>
</div>

</div>

<div className="footerbar"></div>

<div className="foot_bottom">

<br/>
<p>Founded in Early 2024. Website built using React and Firebase. :)</p>
<br/>
<i>Copyright Community Engineers Club</i>

</div>

</div>
</>
)
}

export default Footer