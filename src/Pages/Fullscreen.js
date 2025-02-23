// Show 3D map or 2D map full screen in new tab

import { useParams } from "react-router-dom";
import GoogleMaps from "../elements/GoogleMaps.tsx";
import ModelViewer from "../elements/ModelViewer";

const Fullscreen = ({ customCounter }) => {

const { pageId } = useParams();

return(
<>
<head>
    <title>Full Screen Viewer | CEC</title>
</head>

{pageId == "3d" && 
    <ModelViewer custom_counter={ customCounter } make_fullscreen={ true }/>
}

{pageId == "2d" &&
    <GoogleMaps custom_counter={ customCounter }/>
}
</>
)
}

export default Fullscreen