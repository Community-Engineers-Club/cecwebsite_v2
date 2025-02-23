    /*
    Algorithm here:
    1. parse pools + of points from downloaded CSV file. Now they should be arrays.
    2. Determine if flooding in pools 2D array (send to calculator.js). Returns new array og 2D pools
    3. Send to <GoogleMaps/> to display markers for 1D array and polygons for 2D array of pools
    4. Done!

    Algorithm 3D map:
    See ModelViewer.js. Essentially translates counter to slidervalue and updates automatically.
    counterFactor needs tinkering with for precision.
    */

import React, { useEffect, useState } from 'react';
import {APIProvider, Map, MapCameraChangedEvent, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import proj4 from "proj4";
import { parseCSV } from '../functions/dataAnalysis.js';
import { Polygon } from './components/Polygon.tsx';
import { getApiKey, getCounter } from '../functions/Firestore_Listener.js';
import { pool_calculator } from '../functions/calculator.js';
import { useAuth } from '../authContext/AuthProvider.js';

//type Poly =[{ lat: number, lng: number }]
type Poi ={ key: string, location: google.maps.LatLngLiteral }

// For testing purposes
const array_test = [[3, 6, 83, 7875, 399]]; // ids of relative minimums
const pools_test = [[3, 6, 83, 7875, 399]]; // pool id numbers


// External function to display map of flooding pool centers / relative mins
// Steps: convert to lat + long + load on map and display map
// async b/c other stuff can happen at the same time
async function displayPointMap(relminArray) {
  // REL MIN ARRAY:
  const id_csv_file = "/Models/value_id_incr.csv";
  const id_csv = await parseCSV(id_csv_file);
  const latlong_array_marker: {key: string, longitude: number, latitude: number}[] = []; // array of converted latitude and longitude points

  for (let i = 0; i < relminArray[0].length; i++) {
    let x = id_csv[relminArray[0][i]][2]; // get x from id in id_csv row
    let y = id_csv[relminArray[0][i]][3]; // get y from id in id_csv row

    const {longitude, latitude} = xy_ToLatLong(parseInt(x), parseInt(y))

    let update = {key: String(i), longitude: longitude, latitude: latitude};
    latlong_array_marker.push(update)
  }
    const formattedPoints: Poi[] = latlong_array_marker.map(point => ({
        key: point.key,
        location: {lat: point.latitude, lng: point.longitude}
    }))

    return formattedPoints;
}


// Displays pool polys
async function displayPoolPolys(poolArray) {
  // Pool array
  const id_csv_file = "/Models/value_id_incr.csv";
  const id_csv = await parseCSV(id_csv_file);
  const latlong_array: {lat: number, lng: number}[][] = []; // array of converted latitude and longitude points

  for (let i = 0; i < poolArray.length; i++) {
    for (let j = 0; j < poolArray[i].length; j++) {
      let x = id_csv[poolArray[i][j]][2]; // get x from id in id_csv row
      let y = id_csv[poolArray[i][j]][3]; // get y from id in id_csv row
  
      console.log("lng: ", x, "lat: ", y)
      const {longitude, latitude} = xy_ToLatLong(parseInt(x), parseInt(y))

    // Ensure sub-array exists before pushing
    if (!latlong_array[i]) {
      latlong_array[i] = [];
    }

    console.log(latlong_array[i][0]);
      latlong_array[i].push({lat: latitude, lng: longitude})
      console.log(i);
    }
  }
    /*const formattedPoints = latlong_array_marker.map(point => ({
        key: point.key,
        location: {lat: point.latitude, lng: point.longitude}
    })) */

        console.log(latlong_array)
    return latlong_array;
}


// Main handler function
/* 
  What it does:
  1. reads pools and relmins from parsed CSV
  2. Find flooded points out of pools
  3. Gets locations and GPS coordinates of flooded points + relmins
  4. Returns 2 arrays- Pool: {lat, lng}, relmins: {key, lng, lat} to be displayed on google maps

*/
async function getPointsToDisplay(counter) { // needs counter passed to it to calculate flooding
    
    // if not custom counter: get one.
    if (!counter) {
      counter = await getCounter();
    }
  
      // Step 1: parse and get arrays
      const relmins = await parseCSV("/Models/new_relmins.csv"); // 2D array, but relmins all in first row
      const pools = await parseCSV("/Models/new_pools.csv"); // 2D array

      // Step 2: find flooded points using pool_calculator
      const flooded_points = await pool_calculator(pools, counter) // 2D Array

      // Step 3: get GPS coordinates in format ready to be visualized
      const pools_display = await displayPoolPolys(flooded_points);
      const relmins_display = await displayPointMap(relmins);

      // Step 4: return arrays- (pools_display, relmins_display)
      console.log("SUCCESS?")
      return {pools_display, relmins_display};
}


// External function for testing
const GoogleMaps = ( {custom_counter} ) => {
  // User logged in?
  const { userLoggedIn } = useAuth();

  // User not logged in - refresh page (should work on advisorysystem/overview)
  
  
  // Ensuring apikey is retrieved before map load
  const [apiKeys, setApis] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Finalized locations and poly points
  const [locations, setLocations] = useState<Poi[]>([]); // Store dynamic markers
  const [polyPoints, setPolyPoints] = useState<{lat: number, lng: number}[][]>([[]]);

  // Fetch POIs and update state when component mounts
  useEffect(() => {

    const fetchApi = async () => {
      try {
        const api = await getApiKey()
        console.log("api: ", api)

        setApis(api)
        setMapLoaded(true);

      } catch(error) {
        console.error("Error fetching API key: ", error);
      }
    }

    // Fetch points + polygons to display
    const fetchDisplay = async () => {
      try {
       const { pools_display: pools, relmins_display: relmins} = await getPointsToDisplay( custom_counter );
       setLocations(relmins);
       setPolyPoints(pools);
       console.log("poly fetch: ", pools);
      } catch(error) {
        console.error("Error fetching pools, relmins to display: ", error);
      }
    }

    fetchApi();
    fetchDisplay();


  }, [userLoggedIn]); // Runs only once when the component mounts

return(
<div style={{width: '100%', aspectRatio: '1.66', margin: 'auto'}}>
  {mapLoaded && userLoggedIn ? (
 <APIProvider apiKey={apiKeys} onLoad={() => console.log('Maps API has loaded.')}>
   <Map
      defaultZoom={16}
      mapTypeId='satellite'
      defaultCenter={ { lat: 40.9949, lng: -73.7929 } }
      mapId='DEMO_MAP_ID'
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
    {/*<PoiMarkers pois={locations} />*/}


    {polyPoints.map((val, index) => (
    <Polygon
      fillColor={'blue'}
      strokeColor={'blue'}
      paths={val}
        /*paths={[
        {lat: 25.774, lng: -80.19},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757}
        ]}*/
    />
  ))}
    
   </Map>
 </APIProvider>
  ) : (
  <p>Map loading...</p>
  
  )}
 </div>
);

};


const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
        <Pin/>
        </AdvancedMarker>
      ))}
    </>
  );
};


// Converts xcoord and ycoord from utm18 (18N zone - latitude, EPSG:32618) to coordinates
// latitude and longitude for display
// eastX: xcoord, northY: ycoord

 // ARCHIVE
  // Define the UTM Zone 18N (EPSG:32618) projection
  //proj4.defs("EPSG:32618", "+proj=utm +zone=18 +datum=WGS84 +units=m +no_defs");
  
  // Define the WGS 84 geographic coordinate system
  //proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
function xy_ToLatLong(eastX, northY) {
    const [longitude, latitude] = proj4("EPSG:32618", "EPSG:4326", [eastX, northY])
    return {longitude, latitude}
  }
  


  export default GoogleMaps;
