import React, {useState} from 'react'
import './styling/Doc_Module.css'

function Doc_Module(props){

/*

"type"
1 - light

2 - dark

3 - short (short light)
    Params: 
    "color" - border color
    "background" - background color

*/
const renderModule = () => {
switch(props.type) {

    case "dark":
        return <>
        <div className="box" style={{outline: "1.5px solid " + props.color, border: "border: 1.2px solid whitesmoke"}}>
        <h1 style={{backgroundColor: "rgb(27, 30, 36)"}}>{props.title}</h1>
            <div className="box_section" style={{color: "whitesmoke"}}>
              <p>{props.children}</p>
            <div className="box_line" style={{color: "whitesmoke"}}></div>
            <p>Other</p>
            </div>
        </div>
        
        </>

case "light":
    return <>
    <div className="box" style={{outline: "1.5px solid " + props.color, border: "border: 1.2px solid black"}}>
    <h1 style={{color: "black", backgroundColor: "white"}}>{props.title}</h1>
        <div className="box_section" style={{color: "rgb(10, 10, 10)"}}>
          <p>{props.children}</p>
        <div className="box_line"></div>
        <p>Other</p>
        </div>
    </div>
    
    </>

case "short":
    return <>
        <div className="box" style={{outline: "1.5px solid " + props.color, backgroundColor: props.background}}>
        <div className="box_section" style={{color: "black"}}>
        <p>{props.children}</p>
        </div>
    </div>
    </>

default:
    return <p>Error</p>


}
}

return(
<>
{renderModule()}
</>
)
}

export default Doc_Module