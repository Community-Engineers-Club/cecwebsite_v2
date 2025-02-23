import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import ModelViewer from '../elements/ModelViewer.js';
import GoogleMaps from '../elements/GoogleMaps.tsx';
import { useAuth } from '../authContext/AuthProvider.js';
import { getWeather } from '../functions/weather.js';
import Graph from '../elements/components/Graph.js';
import { getCounter } from '../functions/Firestore_Listener.js';
import './styling/predict.css'
import Module from '../elements/Module.js';

const  Predict = () => {

    const { userLoggedIn } = useAuth() // user logged in?


    // Display code
    const [display2D, setDisplay2D] = useState(false);
    const [display3D, setDisplay3D] = useState(false);
    const [displaying, setDisplaying] = useState(false);
    const [fullscreen, setFullScreen] = useState(false);

    // Mode
    const [mode, setMode] = useState("normal");
    const [userCounter, setUserCounter] = useState(0);
    const [userRainfall, setUserRainfall] = useState(0);


    // Variables
    let startIndex = useRef(0);
    let translatedIndex = useRef(0);  // translated index to reference precipitation time within weather data

    // Future Precipitation Selection Menu
    const [rainInterval, setRainInterval] = useState('');
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderMax, setSliderMax] = useState(0);
    const [sliderText, setSliderText] = useState(''); // time reference of numerically selected slider

    const [wholeCounter, setWholeCounter] = useState(0);
    const [simulatedCounter, setSimulatedCounter] = useState(0);
    const [rainData, setRainData] = useState([]);

    // Weather update
    const [weatherData, setWeatherData] = useState();
    const [loaded, setLoaded] = useState(false);
    const [accumRain, setAccumRain] = useState(0);

    const [realCounter, setRealCounter] = useState(0);

    useEffect(() => {

      const fetchWeatherCounter = async () => {
        try {
          const weather = await getWeather()
          const counter = await getCounter()
          setRealCounter(counter);
          setWeatherData(weather);
          setLoaded(true);
        } catch(error) {
          console.error("Error fetching weather: ", error);
        }
      }
      fetchWeatherCounter();
    }, []);

    // Slider value changes
    function precipValueChange(value, rainValue) {
      setSliderValue(value);
      console.log("weather: ", weatherData)

      let timeArray; // location of precipitation array

      switch(rainValue) {
        case "15min":
          timeArray = weatherData.minutely_15.time;
          break;
        case "hourly":
          timeArray = weatherData.hourly.time;
          break;
        default:
          console.error("Rain interval is not selected. It does not exist.")
      }
        const currentTime = new Date(weatherData.current.time);
        const firstIndex = timeArray.findIndex((timePeriod) => new Date(timePeriod) > currentTime)
        console.log("firstindex: ", firstIndex)
        const realIndex = parseInt(value) + firstIndex;
        const curDate = new Date(timeArray[realIndex]);

        // Updates
        startIndex.current = (firstIndex);
        translatedIndex.current = (realIndex);
        console.log("translated index: ", translatedIndex)
        setSliderText(curDate.toLocaleString())
    }


    // Precipitation interval option changes
    function precipOptionChange(value) {
      setRainInterval(value)
      setRainData([]); // reset graph
      // set range of slider:
      if (value == "15min") { // next 12 hours
        setSliderMax(12 * 4); // 0 to max time;
        setSliderValue(0);
        
      } else if (value == "hourly") { // next 3 days
        setSliderMax(24 * 3); // three days
        setSliderValue(0);
      }

      precipValueChange(0, value);

    }

    function btnLogic() {
      if ((rainInterval != '' && mode == "normal") || (mode == "counter") || (mode == "rain"))
        return true;
    }

    // display predicted results once 'update' button is pressed
    function displayPrediction(e) {
      e.preventDefault()

      setDisplaying(false); // stop displaying as options are changed

      if (mode == "normal") { // normal

      let time_interval; // time interval between each measurement: % of hour
      let precipitationArray; // location of precipitation array
      let timeArray;
      let tempGraphData = [];

      switch(rainInterval) {
        case "live":
          break;
        case "15min":
          time_interval = 0.25;
          precipitationArray = weatherData.minutely_15.precipitation;
          timeArray = weatherData.minutely_15.time;
          break;
        case "hourly":
          time_interval = 1;
          precipitationArray = weatherData.hourly.precipitation;
          timeArray = weatherData.hourly.time;
          break;
        default:
          console.error("Rain Interval error.")
      }

      let accumulatedRainfall = 0; // unit: inches
      let timePassed = 0;
      let counterReduction = 0;

      for (let i = startIndex.current; i <= translatedIndex.current; i++) {
        accumulatedRainfall += precipitationArray[i];
        timePassed += time_interval;

        // Fill graph precipitation display
        tempGraphData.push( {time: timeArray[i], precipitation: precipitationArray[i]} )

        if (timePassed >= 12) { // every 12 hours = reduction in counter by 1 (assume evaporation)
          counterReduction += 1;
          timePassed = 0; // reset timePassed
        }
        
      }

      console.log("accum rainfall: ", accumulatedRainfall, "counter reduction: ", counterReduction)
      console.log("transformed index: ", translatedIndex.current)
      setAccumRain(accumulatedRainfall);
      // Note again: 1 counter = 1.326 in^3 of rain over 15.744 in^2 area. so: 1.326 in^3 / 15.744 in^2 = 0.08422256 in of rain
      let whole_counter = Math.floor(accumulatedRainfall / 0.08422256);
      let sim_counter = (whole_counter - counterReduction > 0) ? (whole_counter - counterReduction) : (0)

      setWholeCounter(whole_counter);
      setSimulatedCounter(sim_counter);
      setRainData(tempGraphData);
      console.log("temp rain data: ", tempGraphData)
      
      console.log("whole counter: ", whole_counter, "sim counter: ", sim_counter)
    } else if (mode == "counter"){ // mode == counter
      setWholeCounter(userCounter);
      setAccumRain(userCounter * 0.08422256);
    } else if (mode == "rain"){
      setAccumRain(userRainfall);
      setWholeCounter(Math.floor(userRainfall / 0.08422256));
    }
    }

    // Set dislay option for google maps + 3D map
    // Params: value selected
    function setDisplayOptions(value) {
      switch(value) {
        case "2d":
          setDisplay2D(true);
          setDisplay3D(false);
          break;
        case "3d":
          setDisplay3D(true);
          setDisplay2D(false);
          break;
        case "both":
          setDisplay2D(true);
          setDisplay3D(true);
          break;
      }
    }

    function displayMap(e) {
      e.preventDefault();

      if(displaying)
        setDisplaying(false); // if displaying >> stop.
      else
        setDisplaying(true); // if not displaying >> start.
    }

    return(
    <div style={{marginTop: "20px", marginBottom: "20px"}}>

      <Module type="directory-fas"/>

      <br/>

      <div className ="centerDiv_gradient">
        <div className="centerDiv">
        <h1 style={{marginBottom: "10px"}}>About this tool</h1>
        <p>This tool helps you visualize potential flooding at Scarsdale High School up until the next 3 days using forecasted precipitation data.</p>
        
        <br/>
        <div style={{textAlign: "left", display: "inline-block"}}>
          <b>You can:</b>
          <p>1. Select precipitation data accumulating up until 3 days (select the 'hourly' option) into the future and visualize it on a graph.</p>
          <p>2. Visualize the flooding level based on the accumulated water on a 2D google maps display or 3D rendering.</p>
        </div>
        </div>
      </div>

      <div className="center_gradient">
        <div className="center_main">
          <div style={{textAlign: "left", display: "inline-block"}}>
          <b>Please select a precipitation frequency type:</b>
          <p>1. Every 15 minutes: predicted precipitation for every 15 minutes from current local time in Scarsdale, NY up until 3 <b>hours</b> later.<br/></p>
          <p>1. Hourly: predicted precipitation every hour from the current local time in Scarsdale, NY up until 3 <b>days</b> later.<br/></p>
          <br/>
          <p>Also note: use normal mode to achieve this. If you want to try setting the counter itself and display results, change the mode to 'Set Counter'.</p>
          </div>

          <br/><br/>
          <select onChange={(e) => {
            setMode(e.target.value)
            setRainInterval('');
            setSliderMax(0);
            setSliderValue(0);
            setSliderText('');
            setAccumRain(0);
            setWholeCounter(0);
            }}>
            <option selected value="normal">Normal</option>
            <option value="counter">Set Counter</option>
            <option value="rain">Set Rainfall</option>
          </select>

          <br/><br/>
          {mode != "normal" && <input
          style={{width: "40px", height:"20px"}}
          required
          type="number"
          value={ mode == "counter" ? (userCounter): (userRainfall)}
          onChange={(e) => {

            if (mode == "counter") {
            if (e.target.value >= 0 && e.target.value <= 70)
              setUserCounter(e.target.value);
            } else { // mode =="rain" b/c otherwise this button wouldn't be visible
              if (e.target.value >= 0 && e.target.value <= 7) // 0-7 inches rain
                setUserRainfall(e.target.value)
            }
          
          }}
          />}

          {mode == "rain" && <span> inches</span>}

          {mode == "normal" &&
          <select onChange={(e) => { precipOptionChange(e.target.value) }}>
            <option selected disabled value="">Choose option</option>
            <option value="15min">Every 15 minutes</option>
            <option value="hourly">Hourly</option>
          </select>

          }

          <br/><br/>
          <form onSubmit={(e) => displayPrediction(e)}>
          
          {mode == "normal" &&
          <>
          <input
          
          style={{width: "40%", height:"20px"}}
          type="range"
          min="0"
          max={sliderMax}
          value={sliderValue}
          step="1"
          onChange={(e) => precipValueChange(e.target.value, rainInterval)}></input>
          
          <br/>
          <p>from <i>now</i></p>
          <p>until {sliderText}</p>
          <br/>

          </>
          }

          { btnLogic() && <button
          style={{padding: "10px", fontWeight: "bold"}}

        type="submit"
        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${userLoggedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
        >
        Confirm
        </button>  }
        </form>

        <br/>
        <p>Total accumulated rainfall: {accumRain} inches</p>
        <p>Simulated counter value: {wholeCounter}</p>
        <i>Source: Open-Meteo Free Weather API</i>



        </div>
      </div>

      {mode == "normal" && <Graph data={rainData}/>}

      <div className="center_gradient">
        <div className="center_main">
          <h2>Now, you can choose to visualize how this rainfall might accumulate on school property.</h2>
          <br/>
          <p>Note that if you want to update precipitation data above, it is easier if you hide the maps below.
            They will also hide automatically if you press the 'update' button above.</p>
            <br/><br/>
            <p>Recommendations: Use the 2D Google Maps to learn of wet areas. See the 3D map for significant areas of flooding.</p>

          <br/>
          <form onSubmit={(e) => displayMap(e)}>
            <select onChange={(e) => { setDisplayOptions(e.target.value) }}>
              <option selected disabled value="">Choose display</option>
              <option value="2d">2D Google Maps</option>
              <option value="3d">3D Map</option>
              <option value="both">Both</option>
            </select>

            <br/><br/>
            <button
            style={{padding: "10px", fontWeight: "bold"}}
            type="submit"
            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${userLoggedIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
            >
            {displaying ? ('Hide') : ('Show')}
            </button>
          </form>

          <div style={{textAlign: "left", display: "inline-block"}}>
            </div>
        </div>
      </div>


    {display2D && displaying && 
    <GoogleMaps custom_counter={wholeCounter}/>
    }

  {display3D && displaying && 
    <ModelViewer custom_counter={wholeCounter}/>
    }

    </div>
)
  }

export default Predict;