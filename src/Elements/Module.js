import React from "react";
import './styling/Module.css'

function Module(props){

const renderModule = () => {
    switch (props.type){
        case "main":
        return <>
            <article className="text_module">
                <div className="tm_title">
                    <h1>{props.title}</h1>
                </div>

                <div className="tm_content">
                    <p>{props.children}</p>
                </div>
            </article>
            </>

        case "title":
        return <>
            <section className="title_module">
                <h1>{props.title}</h1>
            </section>
            </>

        case "text":
            case "main":
            return <>
                <article className="text_module">        
                    <div className="tm_textonly">
                        <p>{props.children}</p>
                    </div>
                </article>
                </>

        case "image":
            return <>
                <img src={props.src} style={{width: props.width, display: "block", margin: (props.position == 'center' && 'auto')}}>{props.text}</img>            
            </>

        default: return <p>Error</p>
    }
}

    return(<>{renderModule()}</>)
}

export default Module