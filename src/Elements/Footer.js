import React from 'react';
import './styling/Footer_styl.css'

function Footer(){

return(
<>
<div id="footer">

<div style={{float: "left", marginRight: "20px"}}>
<img style={{height: "180px"}} src="/Images/groupme.png"></img>
  <br/>
  <p style={{textAlign: "center"}}>Join our Group Me!</p>
</div>

<div style={{ maxWidth: "900px", lineHeight: "1.5"}}>
  <p><b>The Community Engineers Club </b>is a non-competitive collaborative environment, encouraging people of various interests (ranging from art to programming) to meet and utilize their skill sets to create products for the school, local community, and beyond. We wanted to offer an alternative option (as the only other engineering club was the Robotics club) for students interested in engineering to really get a chance to explore the field.</p>
</div>

<br/>
<b>wednesdays 3PM @ the design lab</b>
<br/>
<div className="footerbar"></div>
<br/>
<p style={{float: "right"}}>since fall 2023.</p>

</div>
<br/>
</>
)
}

export default Footer