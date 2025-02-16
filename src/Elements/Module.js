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

        case "directory-fas":
            return <>
            <ul className="directory_module">
                <p><a className="link" href="/advisorysystem/overview">Overview</a></p>
                <p><a className="link" href="/advisorysystem/3dmap-warning">3D Map</a></p>
                <p><a className="link" href="/advisorysystem/predict">Flooding Prediction Calculator</a></p>
                <p><a className="link" href="/advisorysystem/documentation">Documentation</a></p>
                <p><a className="link" href="/advisorysystem/editor">Admin Panel</a></p>
            </ul>
            </>

        case "table_contents":
            return <>
            <h2 style={{marginLeft: "29%", fontSize: "110%"}}>Page Contents</h2>
            <ul className="table_div">
                {props.children}
            </ul>
            </>

        case "table_contents-long":
            return <>
            <div className="table_div-long">
            <h2 style={{paddingLeft: "60px", borderLeft: "10px solid rgb(30, 38, 67)", marginBottom: "5px", overflow: "hidden"}}>Page Contents</h2>
            <ul className="table_div-long-ul">
            {props.children}
            </ul>
            </div>
            </>

        case "table_contents-long-archive":
            return <>
            <div className="table_div-long">
            <h2 style={{paddingLeft: "60px", borderLeft: "10px solid rgb(30, 38, 67)", marginBottom: "5px", overflow: "hidden"}}>Page Contents</h2>
            <ul style={{paddingLeft: "100px"}}>
            {props.children}
            </ul>
            </div>
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