import React, { useEffect, useState, memo } from 'react';
import {APIProvider, Map, MapCameraChangedEvent, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import proj4 from "proj4";
import { parseCSV } from './dataAnalysis';
import { Polygon } from './Polygon.tsx';

//type Poly =[{ lat: number, lng: number }]
type Poi ={ key: string, location: google.maps.LatLngLiteral }

const array_test = [3, 6, 83, 7875, 399]; // ids of relative minimums
const pools_test = [[3, 6, 83, 7875, 399]]; // pool id numbers

// External function to display map of flooding pool centers / relative mins
// Steps: convert to lat + long + load on map and display map
// async b/c other stuff can happen at the same time
async function displayPointMap(relminArray) {
  // REL MIN ARRAY:
  const id_csv_file = "/Models/value_id_incr.csv";
  const id_csv = await parseCSV(id_csv_file);
  const latlong_array_marker: {key: string, longitude: number, latitude: number}[] = []; // array of converted latitude and longitude points

  for (let i = 0; i < relminArray.length; i++) {
    let x = id_csv[relminArray[i]][2]; // get x from id in id_csv row
    let y = id_csv[relminArray[i]][3]; // get y from id in id_csv row

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


// External function for testing
const GoogleMaps = (props) => {
  
  // values:
  const relmins = props.relmins;
  const pools = props.pools;

  const [locations, setLocations] = useState<Poi[]>([]); // Store dynamic markers
  const [polyPoints, setPolyPoints] = useState<{lat: number, lng: number}[][]>([[]]);

  // Fetch POIs and update state when component mounts
  useEffect(() => {
    const fetchAndUpdateMarkers = async () => {
      try {
        const updatedLocations = await displayPointMap(array);
        setLocations(updatedLocations); // Update the state, triggering a re-render
      } catch (error) {
        console.error("Error fetching POI locations:", error);
      }
    };

    const fetchAndUpdatePoly = async () => {
      try {
        const updatedLocations = await displayPoolPolys(pools);
        setPolyPoints(updatedLocations); // Update the state, triggering a re-render
      } catch (error) {
        console.error("Error fetching POLY locations:", error);
      }
    };

    fetchAndUpdatePoly();
    fetchAndUpdateMarkers();


  }, []); // Runs only once when the component mounts

return(
<div style={{width: '80%', aspectRatio: '1.66', margin: 'auto'}}>
 <APIProvider apiKey={'AIzaSyDB2AYsO6fS73W2tiJW6FCrwKuXGDqKzXo'} onLoad={() => console.log('Maps API has loaded.')}>
   <Map
      defaultZoom={16}
      mapTypeId='satellite'
      defaultCenter={ { lat: 40.9949, lng: -73.7929 } }
      mapId='DEMO_MAP_ID'
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
    <PoiMarkers pois={locations} />


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
