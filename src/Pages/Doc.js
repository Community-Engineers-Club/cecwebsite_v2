
// Documentation page has own file due to its size.

import { useEffect, useState } from "react";
import Module from "../elements/Module";
import { downloadFile } from "../functions/dataAnalysis";
import { useLocation } from "react-router-dom";

const Doc = () => {

  const location = useLocation();

  const [fileLocation, setFileLocation] = useState('');

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the # symbol
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location])

    return(
    <>
    <Module type="directory-fas"/>

<div style={{display: "flex", justifyContent: "center"}}>
    <section className="doc_contents"style={{width: "40%"}}>
      <Module type="table_contents-long">
      <li><a className="link" href="#">Top</a></li>
      <li><a className="link" href="#introduction_doc">Introduction</a>
      <ul>
        <li>Page Overview</li>
        <li>Advisory System Overview</li>
        <li><a href="#summary_doc">Summary: How everything works</a></li>
      </ul>
      </li>
        <li><a className="link" href="#system_doc">System Components & Files</a>
        
        <ul>
        <li><a href="#wlinks_doc">Website-related Links</a></li>
        <li><a href="#alinks_doc">Arduino-related Links</a></li>
        <li><a href="#pdc_doc">Physical Device Components</a></li>
        <li><a href="#pdas_doc">Physical Device Additional Supplies</a></li>
        <li><a href="#downloads_doc">Downloads</a></li>


        </ul>

        </li>

        <li><a className="link" href="#physical_doc">Physical Device System Guide</a>
        
        <ul>
        <li>Overview</li>
        <li><a href="#device_running_doc">Important: How to ensure the device is running properly</a></li>
        <li><a href="#interior_doc">Interior: Images and Electrical Wiring</a></li>
        <li><a href="#exterior_doc">Exterior: Images & Video</a></li>
        <li><a href="#assembly_doc">Assembly Process</a></li>
        </ul>
        
        </li>
        <li><a className="link" href="#psoftware_doc">Physical Device Software Guide</a>
        <ul>
        <li>Overview</li>
        <li><a href="#uploadcode_doc">Uploading code to Arduino</a></li>
          <li><a href="#arduino_doc">Arduino Code Guide</a></li>
        </ul>
        </li>
        <li><a className="link" href="#web_doc">Website Code Guide</a>
        <ul>
          <li>How to approach this section</li>
          <li><a href="#commandtutorial_doc">Intro to Firebase and Git Commands Tutorial</a></li>
          <li><a href="#rainconversions_doc">Rainfall Conversion Calculations</a></li>
          <li><a href="#dataretrieval_doc">Data Retrieval</a></li>
          <li><a href="#2dgoogle_doc">2D Google Maps Visualization</a></li>
          <li><a href="#3drendering_doc">3D Rendering Visualization</a></li>
          <li><a href="#predict_doc">Prediction Model</a></li>
          <li><a href="#hiddencode_doc">Hidden Code / Backend</a></li>
          <li><a href="#other_doc">Other</a></li>
        </ul>
        </li>
      </Module>
    </section>
      
      <section>
      <Module type="text" id="resources">
      <p>V1.0.3</p>
      <br/>
      <p>QUICK! How can I learn how everything works fast!?! Follow <a className="link" href="#summary_doc">this tutorial.</a></p>
      <br/>
      <b>Please excuse any spelling mistakes or minor errors! This page is long and took a long time to make, so please have sympathy. :)</b>
      <br/><br/>
        <h1 id="introduction_doc" className="scrollpadding" style={{fontSize: "200%"}}>Introduction</h1>
        <br/>
        <b>Page Overview</b>
        <p>This documentation page serves to record and simply explain how every part - from the physical system to the many layers of software- of the club's flood advisory system works.
            This is made to serve as a reference for club members to understand how it works and how to maintain it as well as to curious users who want to learn about how we made this system.
            Please use the table of contents and the system overview section to guide you.
        </p>
        <br/>
        <b>Advisory System Overview</b>
        <p>The Flood Advisory System aims to inform faculty and students of the water level and flooding on property at Scarsdale High School, particularly in the parking lots.
          This is achieved through measuring the rainfall onsite and sending this data online for an algorithm to interpret the data and visually display and predict flooding on a public website.
        <br/><br/>
        We can break the system down into 2 sections: the physical component and the software component.
        <br/><br/>
        The physical component consists of an electrical box housing electronics including an Arduino Nano ESP32, a solar panel, batteries,
        and a magnetic sensor. Externally, there is a plastic rain gauge with a tipping bucket mechanism that measure the rainfall in certain quantities. The plastic rain gauge and housing is fastened on a wooden plank alongside a brick for stability.
        The physical part is essentially for data-collecting and uploading the data measurements. <i>Please read more in the respective section.</i>
       <br/><br/>
       The digital component consists of a Google Firebase project. Utilizing this service allows us to manage and communicate with a database and host a free website at <i>www.communityengineers.web.app.</i> The website includes code that ensures that
       it functions and algorithms to interpret the data from the database along with other variables, modify the data in the database, and ultimately display the flooding level. <i>Please read more in the respective section.</i>
        </p>

      <br/>

      <p>
      <b id="summary_doc" className="scrollpadding">Summary: How everything works</b>
      <br/>tl;dr it's a lot lol.
      <br/><br/>It's probably easiest to proceed reading the following sections in this order to understand the flow of everything.
      Note that it would literally be too much work to explain everything to the finest detail, so we can't write how the authentication works, how the page generations work,
      or about the technical details of the polygon displays on the google maps, etc. You'd have to figure that out on your own, but we can share the jist of how the algorithm works and you can
      go from there!
      <br/><br/>1. <a className="link" href="#introduction_doc">Advisory System Overview</a> - Step 0: Learn the general layout of the system.
      <br/><br/>2. <a className="link" href="#psoftware_doc">Physical Device Software Guide</a> - Step 1: the physical device. Learn how data is collected and sent by the Arduino online.
      <br/><br/>3. <a className="link" href="#physical_doc">Physical Device System Guide b-e.</a> - Step 2: Learn the wiring, organization of the physical device. Learn how it physically looks and works.
      <br/><br/>4. <a className="link" href="#pdas_doc">Physical Device Additional Supplies</a> - Step 3: Now that you know how the physical device looks, read more into the specific components. Learn everything involved and a description on their purpose.
      <br/><br/>5. <a className="link" href="#dataretrieval_doc">Website Code Guide - IN ORDER!!</a> - Step 4: Read the rest of the chapter in order from c to i. Here, you will learn the steps from obtaining the data to connecting the geographic data and counter data from the device and to displaying the visuals.
      Also, you will learn how to post any code changes if you want. Each section in the chapter builds off one another.


      </p>



        <br/><br/>
        <h1 id="system_doc" className="scrollpadding" style={{fontSize: "200%"}}>System Components & Files</h1>
        <br/>
        <p>This section provides you with external resources that we used to make this system.<br/><p id="wlinks_doc" className="scrollpadding">Website specific links:</p></p>

        <div className="code_like">
        <p><b>GitHub Repository:</b>
        <br/>For open sourcing (publicizing, sharing) our website code.<br/><br/>
        <a className="link" href="https://github.com/Community-Engineers-Club/cecwebsite_v2" target="_blank">https://github.com/Community-Engineers-Club/cecwebsite_v2</a></p>
        
        <p><b>GitHub Organization: </b>
        <br/>For organizing club code contributions and who can publicize updates to our website code.<br/><br/>
        <a className="link" href="https://github.com/Community-Engineers-Club" target="_blank">https://github.com/Community-Engineers-Club</a></p>
        
        <p><b>New York State Digital Elevation Models (DEM): </b>
        <br/>Used to obtain a 3D graphical representation of the terrain (2 meter resolution) at Scarsdale High School and its surroundings.<br/><br/>
        <a className="link" href="https://gis.ny.gov/nys-dem" target="_blank">https://gis.ny.gov/nys-dem</a></p>
        
        <p><b>QGIS:</b>
        <br/>An geographical information system (GIS) used to extract 170,000 datapoints from the SHS digital elevation model into a parsable (readable) friendly format: a CSV File (comma separated file).<br/><br/>
          <a className="link" href="https://qgis.org/" target="_blank">https://qgis.org/</a></p>

        <p><b>Google Firebase:</b>
        <br/>A platform that helps developers build applications. It largely helps with backend development and we use it for making databases, cloud functions, use authentication, and web hosting. It is is for free with a pay-as-you-scale plan.<br/><br/>
        <a className="link" href="https://firebase.google.com/" target="_blank">https://firebase.google.com/</a></p>
        </div>

        <br/><p id="alinks_doc" className="scrollpadding">Arduino-specific:</p><br/>

        <div className="code_like">
        <p><b>Arduino:</b>
        <br/>A company that creates software for the microcontrollers that it produces. The software is open source and user-made libraries are beginner-friendly. This is a link to the software page.<br/><br/>
        <a className="link" href="https://www.arduino.cc/en/software" target="_blank">https://www.arduino.cc/en/software</a></p>

        <p><b>FirebaseClient Library for Arduino:</b>
        <br/>This programming library provides methods for our Arduino Nano ESP32 to connect itself to communicate with our Firebase Database.<br/><br/>
        <a className="link" href="https://github.com/mobizt/FirebaseClient" target="_blank">https://github.com/mobizt/FirebaseClient</a></p>

        <p><b>DHT11 Library Arduino:</b>
        <br/>This programming library allows the Arduino Nano ESP32 to read data from the DHT11 temperature and humidity sensor.<br/><br/>
        <a className="link" href="https://github.com/dhrubasaha08/DHT11" target="_blank">https://github.com/dhrubasaha08/DHT11</a></p>

        </div>

        <br/><p id="pdc_doc" className="scrollpadding">Physical Device Components</p><br/>

        <div className="code_like">
        <p><b>ABS Plastic IP65 Waterproof Electrical Box (220 x 170 x 110 mm)</b>
        <br/>The electrical box used to house the electronics, including an Arduino, solar panel, and battery.<br/><br/>
        <a className="link" href="https://www.amazon.com/Zulkit-Waterproof-Electrical-Transparent-150x100x70/dp/B07RVN91WB/ref=pd_lpo_sccl_2/133-3305077-7371869?pd_rd_w=UJ4k3&content-id=amzn1.sym.1ad2066f-97d2-4731-9356-36b3edf1ae04&pf_rd_p=1ad2066f-97d2-4731-9356-36b3edf1ae04&pf_rd_r=WX5WC9RS0N9V6C0XSM93&pd_rd_wg=1uMVZ&pd_rd_r=ab9c55e8-3462-4944-a9d8-abb2d6e99eeb&pd_rd_i=B07RPNWD47&th=1" target="_blank">Amazon Link</a></p>

        <p><b>Arduino Nano ESP32</b>
        <br/>A small board that is easily programmable, has an effective low power-saving mode, and most importantly: has WiFi capabilities.<br/><br/>
        <a className="link" href="https://store.arduino.cc/products/nano-esp32?srsltid=AfmBOoonwgSNcPG9yD0jZUTdzTK54NfDJQg61UVDSLdGSQp-GlcJDydu" target="_blank">Arduino Link</a></p>

        <p><b>2.5W 5V/500mAh Solar Panel (130 x 150 mm)</b>
        <br/>Solar panel used to power a 3.7V rechargable battery that powers the Arduino Nano ESP32.<br/><br/>
        <a className="link" href="https://www.amazon.com/ALLPOWERS-Battery-Charger-Encapsulated-130x150mm/dp/B074TYH68Z/ref=pd_bxgy_d_sccl_1/131-3057195-5547130?pd_rd_w=XZlpp&content-id=amzn1.sym.7746dde5-5539-43d2-b75f-28935d70f100&pf_rd_p=7746dde5-5539-43d2-b75f-28935d70f100&pf_rd_r=HTE9VQAWAJE0G14S5B7Y&pd_rd_wg=i9OSJ&pd_rd_r=3a1d1119-4cde-4328-bd71-d711ba4d7f57&pd_rd_i=B074TYH68Z&th=1" target="_blank">Amazon Link</a></p>

        <p><b>5V Solar Panel Controller by DFROBOT</b>
        <br/>This controllers directs power from the solar panel to a rechargable battery and directs power from the battery to the Arduino Nano ESP32. (See the schematic drawing in the physical device section.) No soldering necessary for connections!<br/><br/>
        <a className="link" href="https://www.amazon.com/DFROBOT-900mA-Solar-Panel-Controller/dp/B07MML4YJV/ref=sr_1_1?crid=22IT8B42FKCKE&keywords=DFRobot+Solar+Power+Manager+5V&qid=1701717149&sprefix=dfrobot+solar+power+manager+5v%2Caps%2C82&sr=8-1" target="_blank">Amazon Link</a></p>

        <p><b>3.7V 9900mAh 18650 Li-ion Rechargeable Battery</b>
        <br/>A high milliamperage-hour rechargable battery to power the Arduino Nano ESP32 over extended periods of time between charges.<br/><br/>
        <a className="link" href="https://www.amazon.com/CBJJ-Rechargeable-Battery-Flashlight-Headlamp/dp/B0CKHPZJMR/ref=cm_cr_arp_d_product_top?ie=UTF8" target="_blank">Amazon Link</a></p>

        <p><b>18650 Battery Clip Holder Box Case</b>
        <br/>A modular battery holder to house the rechargable battery and connect it to the DFROBOT solar panel controller.<br/><br/>
        <a className="link" href="https://www.amazon.com/gp/product/B00LSG5BKO?&linkCode=sl1&tag=fh-solarpowerarduino-20&linkId=b185c372abae0f2349c4b8625249b637&language=en_US&ref_=as_li_ss_tl#customerReviews" target="_blank">Amazon Link</a></p>

        <p><b>5V Hall Effect Magnetic Sensor</b>
        <br/>A magnetic sensor to detect the rotation of the magnet attached to the tipping bucket mechanism that rotates when each bucket becomes full with water. Comes in pack of 5.<br/><br/>
        <a className="link" href="https://www.amazon.com/HiLetgo-Effect-Magnetic-Sensor-Arduino/dp/B01NBE2XIR/ref=sr_1_6?crid=2J1L7ROJB3VQ8&keywords=adjustable+hall+effect+sensor&qid=1701719580&sprefix=adjustable+hall+effect+sensor%2Caps%2C76&sr=8-6" target="_blank">Amazon Link</a></p>

        <p><b>Neodymium Disc Magnets (1.26 inch x 1/8 inch)</b>
        <br/>Strong magnets glued to the rain gauge that are detected by the magnetic sensor when each bucket rotates. Note: to fit in the rain gauge sleeve, this magnet need to be cut/broken in half! Comes in pack of 6.<br/><br/>
        <a className="link" href="https://www.amazon.com/gp/product/B089CVX89D/ref=ox_sc_act_title_1?smid=A35842ASBR1GKG&th=1" target="_blank">Amazon Link</a></p>

        <p><b>Rain Gauge with Tipping Bucket Mechanism 3D Model</b>
        <br/>The rain gauge that measure water in volumetric quantities and rotates a bucket once it fills up. This 3D model is the STL file of the disassembled rain gauge, situated in a format to be printed by a 3D printer.
        You can replace parts individually as they are meant to fit together like LEGO. Please print using PLA plastic.<br/><br/>
        <a className="link" href="https://skfb.ly/ptw8x" target="_blank">https://skfb.ly/ptw8x</a></p>

        <p><b>40pcs 30cm Long Male-Male Header Jumper Wires</b>
        <br/>These are the wires used to make the connections within the electrical box. They are intentionally very long to ensure that connected wires do not snap if the lid of the enclosure opens completely. For parts that need to be soldered, cut off and strip one of the jumper heads.<br/><br/>
        <a className="link" href="https://www.amazon.com/Solderless-Multicolored-Electronic-Breadboard-Protoboard/dp/B09FNZ97X4/ref=sr_1_2?crid=2AF99UN1449CO&dib=eyJ2IjoiMSJ9.J-wwFzbORMmjviAOq4-tzsM9PWya5ABl8HYe7vlKXJCMMDKZ5JEeKWl14FBhXDC0-zn0FGXSBDtCH_3oSHU8H5M6-ZGKS69BFCah0bjziCY73_TVbtw_qxvViwfi9IGQsXAS5CXUhYy7CDgSfPwVOl-60G2POjdzpIkIfDccAMryKSItflfJgnQhBDG9-pLGw6HVRl5kzjMOY6l3JPzrtWmSb5duUDPLMzuzq9bMaKs.yXoekySTk_12PJDgylI4oCZYyNJQc-IywmD8yqJljQ0&dib_tag=se&keywords=breadboard%2Bwires%2Bmale%2Bto%2Bmale%2B11%2Binch&qid=1712459668&sprefix=breadboard%2Bwires%2Bmale%2Bto%2Bmale%2B11%2Binc%2Caps%2C64&sr=8-2&th=1" target="_blank">Amazon Link</a></p>

        <p><b>DHT11 Temperature and Humidity Sensor</b>
        <br/>The sensor situated inside the electronic enclosure to monitor temperature and humidity condictions.<br/><br/>
        No link to share because we did not purchase a part for this.</p>

        <p><b>Breadboard</b>
        <br/>We use a breadboard with strong glue on the bottom to make the Arduino Nano ESP32 connections and connect the DHT11. This is done to make the connections easier to replace. Using a breadboard does not make these connections weaker
        because the device does not move.
        <br/>
        <br/>
        No link to share because we did not purchase a part for this.
        </p>
        <p><b>USB-A Male to USB-C Male Cable</b>
        <br/>This cable is necessary for the Arduino Nano ESP32 to communicate with the Solar Panel Controller. It can also be used to upload new Arduino Code onto the Arduino.
        <br/>
        <br/>
        No link to share because we did not purchase a part for this.
        </p>


        </div>

        <br/><p id="pdas_doc" className="scrollpadding">Physical Device Additional Supplies</p><br/>

      <div className="code_like">
        <p><b>Solder and an Iron</b>
        <br/>You will need a soldering iron to connect three wires to the hall effect magnetic sensor and two wires to the solar panel. These connections need to be soldered because this based on the connection points, this is the best way
        to ensure a long-term solution. Other connections were intentionally made to be short-term so that they can be replaced easily. This was not possible with the 2 aforementioned connections.<br/><br/>
        </p>

        <p><b>Aluminum Foil Tape</b>
        <br/>This tape was used as an alternative to glueing the magnetic sensor, solar panel controller, and battery holder to the electrical box. This tape is very strongly keeps these components in place.
        Again, this was done to reduce the use of solder and glue when possible. This tape is conductive and need to be separated and covered by insulation tape.<br/><br/>
        </p>

        <p><b>Electrical Insulation Tape</b>
        <br/>This tape was used to cover the strong aluminum foil tape to prevent potentional short circuits.
        It is also used to cover any dangerously exposed wires and group wires together.<br/><br/>
        </p>

        <p><b>Silicone Glue</b>
        <br/>A water resistant polymer glue that has some degree of flexibility.
        This was used to glue the solar panel to the top of the interior of the lid and allow for flexibility as temperature varies from hot to cold throughout the seasons.
        It is also possible to rip the glue in half without destroying the region if you need to replace the solar panel.<br/><br/>
        </p>

        <p><b>2-Component Glue</b>
        <br/>A strong chemically-bonded glue. This was used to bind the rain gauge rails to the side of the electronic enclosure. We used a very strong glue to ensure that the rails
        remain strongly intact for years to come.<br/><br/>
        </p>
      </div>


      <br/><br/>
      <b id="downloads_doc" className="scrollpadding">Downloads</b>
      <p>Here you can download some of the data files we use in our algorithm for visualizing the water level at SHS. Some of these can also be found on our GitHub repository.</p>

      <article
        style={{ margin: "auto", display: "block", textAlign: "center", padding: "20px"}}
      >

      <select onChange={(e) => setFileLocation(e.target.value) }>
        <option selected disabled value="">Choose File</option>
        <option value="Arduino.pdf">Arduino Code (PDF Format)</option>
        <option value="shs2.glb">SHS 3D Model</option>
        <option value="data.xlsx">QGIS Data Extract File w/ ID - Excel</option>
        <option value="value_id_incr.csv">QGIS Data Extract File w/ ID - CSV</option>
        <option value="new_pools.csv">Pools </option>
        <option value="new_relmins.csv">Relative Minimums</option>
        </select>

        <p>File: {fileLocation}</p>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (fileLocation == "Arduino.pdf")
          downloadFile("/Documentation/" + fileLocation, fileLocation)
        else
          downloadFile("/Models/" + fileLocation, fileLocation)}
        }>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-medium rounded-lg ${true ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
        >
          Download File
        </button>  
      </form>

      </article>

      <div className="code_like">
        <p><b>Arduino Code (PDF Format)</b><br/>
        The latest Arduino Code in PDF format.
        </p>

        <p><b>SHS 3D Model</b><br/>
        3D model of school from the 3D map page.
        </p>

        <p><b>QGIS Data Extract File w/ ID</b><br/>
        A file containing around 170,000 datapoints extracted from the digital elevation model (DEM). Each datapoint has an ID, elevation, x coordinate, and y coordinate.
        This file is not the exact file downloaded from QGIS, but a customized collection of multiple DEM extraction files that we made manually along with retrofitting each point with an ID.
        Note also that the x and y coordinates are NOT latitude and longitude but positions in meters (recall: 2m resolution) relative to the north pole and prime meridian. You can convert between the two.
        </p>

        <p><b>Pools</b><br/>
        The QGIS data extract file is parsed through an algorithm that groups points into a 2D array of 'pools' or areas with the same relative minimum point.
        This tells us which points will fill up with rain first and which points contribute to flowing water into the relative minimum.
        </p>

        <p><b>Relative Minimums</b><br/>
        This is a 2D array (albeit there is only one array element within the 2D array) of the relative minimum points within each 'pool'. Read the 'Pools' section
        above to learn more.
        </p>

      </div>


      <br/><br/>

      <section>
      <h1 id="physical_doc" className="scrollpadding" style={{fontSize: "200%"}}>Physical Device System Guide</h1>
      <br/>
      <p>This section will visualize what the physical rain gauge looks like externally and internally. It will also explain how
        to assemble (and in reverse: disassemble) the device. The goal is that visual storytelling will be most effective.
      </p>
      <br/>
      <b>IMPORTANT:</b>
      <p>Before you continue, please visit and read the <a href="#system_doc" className="link">System Components & Files</a> section.
      This section provides <b>very valuable</b> information on each component of the physical device including links to where it was purchased
      and what it does.
      </p>

      <br/><br/>
      <b id="device_running_doc" className="scrollpadding">Important: How to ensure the device is running properly</b>
      <p>Sometimes, it can be a bit tricky to make sure that all the components are functioning and communicating properly. The main issue typically has to due with power.</p>
      <br/>To see if the Arduino is working properly, check the <b>lights emitted</b> from the device. Here are the scenarios:
      <br/><br/><b>1. No lights emitted.</b><br/>No power is received by the Arduino.Solution: check the USB plug and if there is a power source.<br/>
      
      <img src="/Documentation/no_power.jpeg" style={{alignSelf: "center", width: "50%"}}></img>

      <br/><br/><b>2. 1 green light in the top right corner and a RGB blue-purple-red or some combination in the central upper half of the device (see orange arrows below). It can be flashing or stable.</b>
      <br/>This is the most common and trickest issue. This situation means that the Arduino receives power, but not enough or not consistently. To solve it, ensure that it is properly plugged in and that the batteries
      are in place. Here are the recommended steps to try to fix it. If this doesn't work, you made need to look more into other underlying issues.
      <br/><br/>a. Check the voltage of the batteries and ensure they are above 3.5V. The lower the voltage and close to 3V they are, the less power they have. It could not be receiving enough power because the batteries
      do not have much stored energy left.
      <br/><br/>b. Press and hold grey 'reset' button to the left of the rgb light for 3 seconds (circled in orange). Sometimes the system just needs a reset.
      <br/>
      <img src="/Documentation/bad_arduino.jpeg" style={{alignSelf: "center", width: "50%"}}></img>

      <br/><br/><b>3. 1 green light in the top right corner only.</b><br/>This is the ideal scenario! Everything is working!

      <br/>
      <img src="/Documentation/working_arduino.jpeg" style={{alignSelf: "center", width: "50%"}}></img>
      <p>1. Note that what's circled in orange should also be green. This shows how power is being directed from the battery to the Arduino. If the Arduino is working properly, this also is.
        <br/><br/>2. Note also that there is an LED next to a label 'ON' circled in the light blue circle. It is currently off, but will turn red if the solar power manager is receiving electricity
        from the solar panel!
      </p>

      <br/><br/><p style={{fontFamily: "monospace"}}>Only once you have scenario #3, is everything working properly! Double check that outputs are being registered by putting a magnet in front of the magnetic sensor
        and checking the database for updates!
      </p>

      <br/><br/>
      <b id="interior_doc" className="scrollpadding">Interior: Images and Electrical Wiring</b>
      <p>Detailed look inside of the electrical box. It may look a bit messy and complicated, but this image is still very informative.</p>
      <img src="/Documentation/Inside_Cabinet.jpeg" style={{alignSelf: "center", width: "100%"}}></img>

      <br/><br/>
      
      <p style={{textAlign: "center"}}>Schematic drawing of the electrical wiring</p>
      <p style={{textAlign: "center"}}><a className="link" target="_blank" href="/Documentation/schematic.pdf">Open in new tab</a></p>
      <object style={{display: "block", margin: "auto", width: "85%", aspectRatio: "1/1"}} data="/Documentation/schematic.pdf"></object>

      <br/><br/>
      <b id="exterior_doc" className="scrollpadding">Exterior: Images & Video</b>
      <p style={{textAlign: "center"}}>PDF tour of the exterior of the physical device.<br/>Note: brick added for weight - everything has a purpose!</p>
      <p style={{textAlign: "center"}}><a className="link" target="_blank" href="/Documentation/PhysicalTour.pdf">Open in new tab</a></p>
      <object style={{display: "block", margin: "auto", width: "85%", aspectRatio: "1/1"}} data="/Documentation/PhysicalTour.pdf"></object>
      <br/><br/>
      <p style={{textAlign: "center"}}>Video of Bucket Mechanism (part 1: filling up with water, part 2: magnet detection upon rotation)</p>
      <video width="100%" style={{display: "block", marginLeft: "auto", marginRight: "auto", aspectRatio: "16/9"}}controls>
        <source src="/Documentation/bucket_mech.mp4" type="video/mp4"/>
          Video not supported on your browser.
      </video>

      <br/><br/>
      <b id="assembly_doc" className="scrollpadding">(Dis)Assembly Process</b>
      <p>Clearly, the best way to learn this is to experiment with the device, but there are a few important things to note
        because there are some delicate parts. The disassembly process will be listed instead of the assembly since it is easier
        to break things down into their components rather than build them up.
      </p>
      <br/>
      <p>Things to note:
        <br/> 1. You <b>must</b> slide off the rain gauge before opening the lid of the electrical box. The lid swings open rapidly and can break the rain gauge
        connection to the device.
        <br/>2. Be cautious of the open lid resting on the rain gauge slider joints. The lid puts pressure on it and can lead to deterioration over time.
        It would be best to rest the lid slightly above on some other surface.
        <br/>3. When opening the lid be careful that no water on the edges of the lid runs into the enclosure and causes water damaged. This can happen easily.
        <br/>4. Make sure the black part of the magnetic sensor is aligned with the black pen mark on the side of the enclosure. It should press up against the wall
        in this location for it to work. If it isn't, use more aluminium tape or maybe glue to fasten it.
        <br/>5. Also make sure the rain gauge is pressed up against the wall of the enclosure, but not
        too tightly. Test to make sure it rotates correctly and sits well.
        <br/>6. Regularly check the device to ensure it is working and the battery is not draining too fast.
        <br/>7. The stands and funnel are really tightly fastened. <b>Do not</b> try to deattach the two from each other- it isn't necessary.
      </p>
      <br/>
      <p>Disassembly Process:
        <br/>Firstly, this assumes that the electrical device and rain gauge is fully setup and fastened on the wooden plank. If that is the case, here are the steps to remove it.
        <br/>1. Slowly pull the device off the wooden plank. The velcro connecting the two is quiet strong. Careful not to damage the enclosure.
        <br/>2. Unlock the combination lock. Wipe down the plastic if necessary and ensure there is no water and the environment is dry.
        <br/>3. Slowly pull the rain gauge off the rails. Wiggle it from side to side if necessary. The fit is tight, so be slow.
        <br/>4. Remove the two clips and open the lid.
        <br/>5. The following are steps for disassemblying the plastic rain gauge:
        <br/>5a. Like step 3, slowly pull the funnel and stands out of the rails from the main frame.
        <br/>5b. Remove the stopper from the rotating axis and pull it out. The tipping bucket should come loose.
        <br/><br/>That's pretty much it! Make sure to reverse these steps for assemblying it!
      </p>
      </section>
      <br/>

      <section>
      <h1 id="psoftware_doc" className="scrollpadding" style={{fontSize: "200%"}}>Physical Device Software Guide</h1>
      <br/>
      <p>The physical device's goal is to upload every instance that the tipping bucket rotates past the magnet along with the time, temperature, and humidity online to a database.
        The main problem with all devices that are not connected to a main power supply is how it can sustain itself. This is done with a solar panel, battery, and programming the Arduino
        so that it utilizies as little power as possible.
        <br/><br/>
        Here's the thought process behind what is going on:
        <br/>Constantly: the solar panel absorbs light energy from the sun and converts this to electricity which powers the rechargeable battery. The Arduino draws current from the battery,
        which the battery supplies if it can (it should).
        <br/>0. The trigger event is a changing magnetic field detected by the magnetic sensor (powered by the Arduino which is powered by a battery). The following are the steps that happen afterwards:
        <br/>1. This detection triggers the Arduino to wakeup from a power-saving deep sleep where it only draws around 20mA.
        <br/>2. The Arduino attempts to connect to the internet. It will try until it is successful. It will try to connect to the database. If it take more than a minute, it returns to deep sleep and will try again
        when it wakes up later. The previous change is stored in memory.
        <br/>3. The Arduino reads the temperature and humidity from the DHT11.
        <br/>4. The Arduino attempts to upload to the database. If it takes too long or fails too many times it will return to deep sleep and try again later.
        <br/>5. Return to deep sleep. Process starts all over again.
        <br/><br/><b>IMPORTANT SIDE NOTE: </b> The Arduino will also regularly attempt to ping the database every <b>8</b> hours. It will provide the time of the ping as well as the temperature and humidity. Each ping should
        happen at the time of the <span style={{fontFamily: "monospace"}}>nextUpdate</span> attribute that you can find in the database and Statistics section on the Overview page. This helps to monitor that the device is working throughout the day everyday as it should.
      </p>


      <br/>

      <p>
      <b id="uploadcode_doc" className="scrollpadding">Uploading code to Arduino</b>
      <br/>The Arduino Support Guide for uploading your new, improved code sketches to Arduino is <a className="link" target="_blank" href="https://support.arduino.cc/hc/en-us/articles/4733418441116-Upload-a-sketch-in-Arduino-IDE">here.</a>
      <br/>
      <br/>Some other things to note:
      <br/>1. Make sure you installed all code libraries for the 2 extra Arduino libraries linked in the <a className="link" href="#alinks_doc">Arduino-related Links</a> section.
      <br/>2. Make sure the WiFi user and password is correct and that all variables --especially the user email to connect the device to the database-- are correct.
      <br/>3. Be careful when disconnecting the USB-A from the solar panel controller to your computer and when connecting it again. Treat the device as if it's delicate, because it is!


      </p>
      <br/>

      <b id="arduino_doc" className="scrollpadding">Arduino Code Guide</b>
      <p>Reading the a. part of this section should be sufficient to understanding the code. It is well commented as well.</p>
      <p style={{textAlign: "center"}}><a className="link" target="_blank" href="/Documentation/Arduino.pdf">Open in new tab</a></p>
      <object style={{display: "block", margin: "auto", width: "85%", aspectRatio: "1/1", maxWidth: "600px"}} data="/Documentation/Arduino.pdf"></object>
      </section>

      <section>
      <h1 style={{fontSize: "200%"}} id="web_doc" className="scrollpadding">Website Code Guide</h1>
      <br/>
      <p>The reality is that this project is a bit complicated and there is no way to learn how all the files interact without reading each one and exploring how they connect.
        You should do this after you read below. Each file is well commented.
        What is possible to lessen the learning curve, I think, is to explain core parts of the system / algorithm and reference which files are involved. That's exactly what
        is going to happen in this section. Please reference the GitHub alongside this guide.
      </p>

      <br/>

      <p>
      <b id="commandtutorial_doc" className="scrollpadding">Intro to Firebase and Git Commands Tutorial</b>
        <br/>To deploy your code edits onto the live website and post them on the public repository, there are some commands that you should to know to accomplish this. Hopefully, this section should save you a lot of time!
        <br/><br/>Useful Firebase/Terminal Commands - for testing and publishing your changes:
        <div className="code_like">
          <p><b>npm start</b>
          <br/>Starts the testing environment. Launches a demo version of the website in your browser at localhost:3000.
          </p>

          <p><b>'control' + 'c' (for mac)</b>
          <br/>Ends your current line in the terminal and jumps to a new command. This is how you will end your testing environment. 
          </p>

          <p><b>npm run build</b>
          <br/>Compresses your code and puts it in a 'build' directory, read to be published online. (1/2 to publish)
          </p>

          <p><b>firebase deploy —only hosting:communityengineers</b>
          <br/>Deploys the 'build' directory online to the Firebase project at the domain 'communityengineers.web.app' (2/2 to publish)
          </p>

          <p><b>Firebase deploy --only functions</b>
          <br/>Deploys the cloud scheduling functions located in the functions &gt;&gt; index.js (not the one in the 'src' folder).
          These functions help to automatically decrement the counter with time to simulate evaporation.
          </p>
        </div>
        <br/><br/>Useful Git Commands - for publicizing your code changes:
        <div className="code_like">
          <p><b>git status</b>
          <br/>Check the status of edited files.
          </p>

          <p><b>git add *</b>
          <br/>Pushes all of your edited code files to the git stack ready to commited officially. Change the '*' to the path of specific files if you
          don't want to push all of your changes.
          <br/><br/>(1/3 to publicize changes)
          </p>

          <p><b>git commit -m "TITLE DESCRIPTION HERE"</b>
          <br/>Commit all files and give a title description on what you have done. You can do it individually by removing the '-m' with the specific file.
          <br/><br/>(2/3 to publicize changes)
          </p>

          <p><b>git push</b>
          <br/>Push the commit online to be visible on the official repository!
          <br/><br/>(3/3 to publicize changes)
          </p>
        </div>
      </p>

      <br/>

      <p>
      <b id="rainconversions_doc" className="scrollpadding">Rainfall Conversions: From Rain Gauge to Water Level</b>
      <p>This section will explain how each rotation of the rain gauge's tipping bucket translates to rainfall and a change in water level.</p>
      <br/><br/><span style={{fontFamily: "monospace"}}>Theory: </span>When each bucket rotates, that corresponds to it raining <span style={{fontFamily: "monospace"}}>x </span> 
      m^3 over an area of <span style={{fontFamily: "monospace"}}>y</span> inches^2. Using this data and assuming an even distribution of rainfall, we can determine through conversions
      how much it rains over a certain area.
      <div className="code_like">
        <p><b>Area of top of the water funnel 2D cross section</b>
        <br/>15.744 in^2
        </p>

        <p><b>Volume of water in each bucket per tilt</b>
        <br/>1.326 in^3
        </p>

        <p><b>Amount of rainfall over 4m^2 area (area of each elevation point) per bucket tilt</b>
        <br/> 522.181 in^3 or 0.008557 m^3 (using meters because the elevation data retrived from the New York DEM was in meters).
        </p>

      </div>
      <br/>

      This is the exact <span style={{fontFamily: "monospace"}}>rainFactor</span> value used in <span style={{fontFamily: "monospace"}}>pool_calulator</span> from <span style={{fontFamily: "monospace"}}>calculator.js </span>
      to distribute water accumulation over the groups of pools for the <span style={{fontFamily: "monospace"}}>GoogleMaps.tsx</span> display.

      <br/><br/>
      For the <span style={{fontFamily: "monospace"}}>3D map display, </span> we modeled the <span style={{fontFamily: "monospace"}}>counterFactor </span>
      from the <span style={{fontFamily: "monospace"}}>counter_3d_conversion</span> function in <span style={{fontFamily: "monospace"}}>calculator.js </span>
      using real images and data. Here's how:
      <br/>
      <br/>1. Note that slider value for the 2D plane to intersect the 3D plane at the default /normal height (aka the height of the water in ther river) is
      <span style={{fontFamily: "monospace"}}> 23.</span> So therefore, however much the counter value impacts the slider value changing the height of the 2D plane,
      we must set a shift of <span style={{fontFamily: "monospace"}}>+ 20.</span>
      <br/>2a. Calibration: take a look at <a className="link" target="_blank" href="/Documentation/recordrainfall_article.pdf">this PDF</a> from an article on record rainfall in Scarsdale. It includes a reference image of flooding at Scarsdale High School
      on page 2. It claims that this level of flooding coincides with <span style={{fontFamily: "monospace"}}>5.78 inches</span> of rain.
      <br/>2b. So, we try to find the slider value for the 2D plane to intersect the 3D map at the level the water floods the school in the reference image. We find that the slider value to be
      <span style={{fontFamily: "monospace"}}>25.</span>
      <div className="code_like">
        <p><b>Number of counters corresponding to 5.78 inches of rain</b>
        <br/>1.326 in^3 / 15.744 in^2 = 0.08422256 in of rain.
        <br/>The above line finds the number of vertical rainfall by dividing the volume of rain per area.
        <br/><br/>5.78in / 0.08422256 in = 68.6276932 ≈ 68.
        <br/>The above line finds how many counters correspond to 5.78 in of rain. We round down to 68 since counters
        are integers and do not round up.
        </p>
      </div>

      <br/>Now, we have the formula: <span style={{fontFamily: "monospace"}}>25 = 23 + 68 * counterFactor</span> where we solve for the counterFactor.
      Note: yes, we assume the 2d water plane increases constantly through the 3d space. It isn't perfect, but it's the best we can do-- at least to start.
      <br/><br/>Our answer gives us: <span style={{fontFamily: "monospace"}}>counterFactor = 0.029411764</span>

      </p>

      <br/>

      <p>
        <b id="dataretrieval_doc" className="scrollpadding">Data Retrieval</b>
        <p>This section will explain roughly how we go from getting the data to generating the pools and relative minimums.</p>
        <br/>
        <p><b>Def</b> pools<b>:</b> 2D array. Coordinate points that have the same elevation relative minimum point. (I will explain how we find this in this section)</p>
        <br/>
        <p><b>Def</b> relmins<b>:</b> 2D array - really 1D with only one array element, but 2D to parse CSV more easily. The relative minimum point from each pools group. (I will explain how we find this in this section)</p>
        
        <br/>1.Go to the New York State Digital Elevation Model (DEM) database and download 2m resolution data elevation models from the region around Scarsdale High School. 1m resolution give you too many datapoints.
        <br/><br/>2. Open the .img in QGIS, a geographical tool that helps you to interpret the data. Scale the layer region as needed. The smaller the better for performance.
        <br/><br/>3. Raster pixels from the images to points and add geometric attributes to extract the elevation data from the image.
        <br/><br/>4. Export the geometric layer (which has been applied to each pixel) as a comma separated value (CSV) or excel file. Each point has the following attributes: [elevation, xcoord, ycoord]
        <br/><br/>5. Add a new attribute called 'id' to each point. This make it easier to identify. Ensure the points are listed in an increasing elevation order before you assign ids. This file should be <b style={{fontFamily: "monospace"}}>value_id_incr.csv</b>
        <br/><br/>6. Create 2 new files from this CSV/excel file with the x coordinate increasing in value and y coordinate increasing in value. Ensure you now have 3 CSV files. You now have data you can use! The 2 new files
        should be <b style={{fontFamily: "monospace"}}>x_incr.csv</b> and <b style={{fontFamily: "monospace"}}>y_incr.csv</b>.
        <br/><br/>Now we need to find regions of pools to determine which areas flood first.
        <br/><br/><b>File: </b><span style={{fontFamily: "monospace"}}>dataAnalysis.js</span>
        <br></br>1. Parse <b style={{fontFamily: "monospace"}}>y_incr.csv</b> into an array
        <br/><br/>2. Loop through array of points, ordered by y-coordinate.
        <br/><br/>3. Per point, make array of surrounding components (8 total) to compare elevation to. The surrounding ones are those
        <p style={{fontFamily: "monospace"}}> northeast, north, northwest, west, southwest, south, southeast, and east</p> of the current point.
        <br/><br/>4. Loop through array of surrounding coordinates.
        <br/><br/>4a. Do a binary search search through the <b style={{fontFamily: "monospace"}}>y_incr</b> array to find a point with the matching
        y-coordinate of the current surrounding element. If it does not exist, that's ok. Points on the edges will not always have surrounding points
        in all directions. Skip.
        <br/><br/>4b. If the y-coordinate exists: do a regional search from the index of found y-coordinate to find the corresponding x-coordinate.
        Remember that this file is ordered by y-coordinates, so all y-coordinates equal to the one found must be in the surrounding area if they exist. Now you have the
        x and y coordinates as well as the id.
        If they don't exist, that ok for the reason mentioned in 4a. Just skip it.
        <br/><br/>4c. Compare elevation height of each surrounding element to the minimum height among the current element and previously looped surrounding elements.
        Make new minimum if there is a new minimum.
        <br/><br/>5. After array loop of surrounding elements: Go through logic chart of all possible scenarios to determine actions to do for step 7. Please see image below.
        <img style={{width: "100%"}} src="/Documentation/logic_chart.png"></img>
        <br/><br/>8. Download CSV of pools + rel_mins
        <br/><br/>
        Now you should have the pools and relmins!
      </p>

      <br/>

      <p>
        <b id="2dgoogle_doc" className="scrollpadding">2D Google Maps Visualization</b>
        <div className="code_like">
          <p>Prerequisite knowledge: <a className="link" href="#dataretrieval_doc">d. Data Retrieval</a> and <a className="link" href="#psoftware_doc">Physical Device Software Guide</a></p>
        </div>
        <p>This section will explain roughly how to take the <span style={{fontFamily: "monospace"}}>pools</span> and <span style={{fontFamily: "monospace"}}>relmins</span> CSV and convert them into
        a visual 2D represention.</p>
        <br/><b>Files:</b> <span style={{fontFamily: "monospace"}}>GoogleMaps.tsx, calculator.js</span>, and parseCSV function from <span style={{fontFamily: "monospace"}}>dataAnalysis.js</span>
        <br/><br/>0. GoogleMaps is an object that can be displayed. The following runs everytime it is displayed. Also note that the pools and relmins have been cut so that only pools of more than 3 points
        are displayed. This is to eliminate very small and not influential pools.
        <br/><br/>1. Parse <span style={{fontFamily: "monospace"}}>pools.csv</span> and <span style={{fontFamily: "monospace"}}>relmins.csv</span>. Now you have 2 2D arrays.
        
        <br/><br/>2a. Find out which pools, and which points in pools are flooded. Send 2D array of pools to <span style={{fontFamily: "monospace"}}>pool_calculator()</span> in <span style={{fontFamily: "monospace"}}>calculator.js</span>
        <br/><br/>Within<span style={{fontFamily: "monospace"}}> calculator.js:</span>
        <br/>2b. Some things to note: Every bucket tilt / counter corresponds to 1.325 in^3 or 0.008557 m^3 of rain. So, the total amount of rain that falls over a pool, assuming an even rainfall is 0.008557 * the counter * the number of points per pool.
        Let's call this <span style={{fontFamily: "monospace"}}>pool_rain</span>.
        <br/><br/>2c. Parse <span style={{fontFamily: "monospace"}}>value_id_incr.csv</span> into an array.
        <br/><br/>2d. Loop through the 2D pools array, so that within the loop you are looking at an array of elements for one pool.
        <br/><br/>2e. The pools array is the id of the pool element, so merge sort the array from least elevation to largest (or from smallest id to largest since an increasing id corresponds to an increasing elevation).
        <br/><br/>2f. Now we loop through each element of the pool. We want to fill up the points up to the height of the next lowest point. We treat each point like cubes (2m x 2m x (height of next smallest point - current element height))
        for simplicity.
        <br/><br/>2g. We subtract the volume of each point, with the height determined by the height of the next lowest point, from the accumulated rainfall for the pool.
        <br/><br/>2h. We add this filled point to an array of filled pools.
        <br/><br/>2i. We repeat this process until there is no rainfall for the pool left. Now we should only have the points that have some amount of water.
        <br/><br/>2j. Return the pools and relmins that remain to <span style={{fontFamily: "monospace"}}>GoogleMaps.tsx</span>.

        <br/><br/>3. With the returned pools and relmins 2D arrays with the flood points, display polygons for each flooded pool on the map.
        <br/><br/>Now you are done! The polygons are visible on the google map!

      </p>
      
      <br/>

      <p>
        <b id="3drendering_doc" className="scrollpadding" >3D Rendering Visualization</b>
        <div className="code_like">
        <p>Prerequisite knowledge: <a className="link" href="#dataretrieval_doc">d. Data Retrieval</a> and <a className="link" href="#psoftware_doc">Physical Device Software Guide</a></p>
        </div>
        <p>This section will explain how the 3D rendering displays the water level.</p>
        <br/><b>Files: </b><span style={{fontFamily: "monospace"}}>ModelViewer.js</span> and <span style={{fontFamily: "monospace"}}>calculator.js</span>
        <br/><br/>1. An instance of the <span style={{fontFamily: "monospace"}}>ModelViewer.js</span> object is called. The <span style={{fontFamily: "monospace"}}>counter</span> is
        either provided as an object (we are then using a custom one to predict flooding) or we retrieve one from the database.
        <br/><br/>2. With the <span style={{fontFamily: "monospace"}}>counter</span> we call the <span style={{fontFamily: "monospace"}}>calculator.js</span> function <span style={{fontFamily: "monospace"}}>counter_3d_conversion</span>.
        <br/><br/>3. What happens is we are converting the counter to a slider value that corresponds to the height of the 2D gray plane that intersects the object. We are making it a linear function for simplicity
        and calibrate it based on observations.
        <br/><br/>4. We determined the conversion factor to be counter * <span style={{fontFamily: "monospace"}}>0.029411764</span> = an increment in the slider from real world images of flooding and data on how much it rained that data that corresponded to a number of counter measurements.
        <br/><br/>5. The function is (counter * <span style={{fontFamily: "monospace"}}>0.029411764</span>) + 20, because when the counter is 0, a slider value of <span style={{fontFamily: "monospace"}}>20</span> puts the gray plane just at the height of 
        the river through the parking lot.
        <br/><br/>6. We make this conversion, return the slider value, and update the 2D plane height to represent the water level. We are done! Also as a bonus: updates are done automatically! For more specifics, please read the code!

      </p>

      <br/>

      <p>
        <b id="predict_doc" className="scrollpadding" >Prediction Model</b>
        <br/><b>Files: </b><span style={{fontFamily: "monospace"}}>predict.js</span> and <span style={{fontFamily: "monospace"}}>weather.js</span>
        <br/><br/>1. The user sets a mode for <span style={{fontFamily: "monospace"}}>hourly</span> or <span style={{fontFamily: "monospace"}}>minutely</span> timestamps to retrieve data
        and slides a slider to consider rain data up until a certain point.
        <br/><br/>2. We call <span style={{fontFamily: "monospace"}}>weather.js</span> to retrieve the weather data and display what suits with what the user selected. This is an oversimplification, so please
        read the source files.
        <br/><br/>Once the user selected to display the 2D view or 3D view, we display it. Done!
      </p>

      <br/>

      <p>
        <b id="hiddencode_doc" className="scrollpadding" >Hidden Code / Backend</b>
        <p>There is more backend code and nuances. There is a lot and its a lot of work to explain everything. To put it simply for club members with access:
          <br/>Open the Firebase project and explore the database, database rules, authentication parameters, settings, and anything where you can see we have made modiciations.
          Try to understand why we made these changes. Also, visit the Google Cloud Console to see the <span style={{fontFamily: "monospace"}}>cron jobs</span> we have made to decrement
          the counter over time.
        </p>
      </p>

      <br/>

      <p>
        <b id="other_doc" className="scrollpadding" >Other</b>
        <p>I'm telling you, there are so many functions and interconnected things! I didn't even get to explain how we make database calls! Look at <span style={{fontFamily: "monospace"}}>Firestore_Listener.js</span> to see our static and dynamic calls.
        <br/><br/>Still there is so much out there. Just visit our GitHub and explore. I tried to give a good introduction to the most interesting advisory system technical functions versus more website generic functions.
        </p>
      </p>

      </section>
        </Module>
    <br/>
    <br/>
    </section>
</div>
    </>)
  }

export default Doc;