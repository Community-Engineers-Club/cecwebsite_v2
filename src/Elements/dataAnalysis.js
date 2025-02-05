
// THIS IS AN ANALYSIS PAGE. THERE ARE NO RENDERINGS HERE!

import Papa from "papaparse";
/*


What I am doing:
PART 1 - GPS Coordinates

--Find relative minimums across school:--
1.
Start with second row and loop through all rows - skip last row as well

2.
Within each GPS location:
- Find ones directly N, NE, E, SE, S, SW, W, NS (8 total)
- Find which is lowest -> that is new relative minimum
- Is location already included as part of a relative minimum pair? (a seperate 2D array of rel min pairs)
- If this new low is lower -> join the new rel min pair (accessible by index)

3.
At the end: you should have a 2D of relative minimums


--Fill relative minimums--
1.
Convert counter data to volume ->
distribute volume over relative minimum pairs proportional to the number of coordinates in each one

2.
Plot relative minimum pairs on Google Maps >> here are your areas of flooding



PART 2 - 3D MAP
1. Knowing the locations and percent fill of the relative minimums,
translate via proportions this to a water level height that scales up 2D plane intersecting 3D map


*/



// Functions for analyzing csv and determining areas of flooding

  // Variables
  const entries = 169017; // number of entries - excluding header (id, val, ...)
  const num_x_per_y_longitude = "inconsistent - varies per line"; // number of archive: 225
  const y_num_different_latitudes = 475; // number of points per degree longitutde (vertical)
  // note what isn't calculated: how many different degrees lat + long, only how many PER lat + long is calculated

  let GPS_locations = [[]]; // GPS coordinates - for main loop
  let rel_mins = []; // id of relative minimums
  let pools = [[]]; // ids of coordinates the contribute to one pool of flooding

  // CSV File locations
  let value_incr = "/Models/incr.csv"
  let x_incr = "/Models/x_incr.csv"
  let y_incr = "/Models/y_incr.csv"


// Main function
export async function main() {

  console.log("starting.")

  // Get main GPS coordinate array to loop through: y_incr
  GPS_locations = await parseCSV(y_incr); // ordered by y, x's are in random order

  // External loop: through each y: (row_length -2 b/c we don't count 1st + last rows + header)

  let latitude_prev = 0; // previous latitude (represent change)
   // current index in looping through csv (skip first latitudes)
  let x_first = 601097; // first x long (to not be included)
  let x_last = 601995; // last x long (to not be included)

  // Define internal variables
  let x = 0; // x coordinate - longitude
  let y = 0; // y coordinate - latitude
  let value = 0; // height value of coordinate
  let id = 0; // id value of coordinate

  // Going through each entry
  for(let vert_index = 148; vert_index < 500/*entries - 248*/; vert_index++) { // excluding first and last latitudes
    console.log(vert_index)
    //console.log("REDO")
    let surroundings_x = []; // x of surrounding elements: N, S
    let surroundings_y = []; // y of surrounding elements
    let surroundings_id = []; // id of surrounding elements

    // coordinates of current entry
    x = parseInt(GPS_locations[vert_index][2]);
    y = parseInt(GPS_locations[vert_index][3]);
    value = parseInt(GPS_locations[vert_index][1]);
    id = parseInt(GPS_locations[vert_index][1]);
    let x_incr_array = await parseCSV(x_incr)


    // x is not first or last - only center
    if (x != x_first && x!= x_last) {
      // finding locations of all possible neighbors. NOTE: Difference between each lat and long respectively = 2

      // North-East
      surroundings_x.push(parseInt(x - 2))
      surroundings_y.push(parseInt(y - 2))
      // North
      surroundings_x.push(parseInt(x))
      surroundings_y.push(parseInt(y - 2))
      // North-West
      surroundings_x.push(parseInt(x + 2))
      surroundings_y.push(parseInt(y - 2))
      // West
      surroundings_x.push(parseInt(x + 2))
      surroundings_y.push(parseInt(y))
      // South-West
      surroundings_x.push(parseInt(x + 2))
      surroundings_y.push(parseInt(y + 2))
      // South
      surroundings_x.push(parseInt(x))
      surroundings_y.push(parseInt(y + 2))
      // South-East
      surroundings_x.push(parseInt(x - 2))
      surroundings_y.push(parseInt(y + 2))
      // East
      surroundings_x.push(parseInt(x - 2))
      surroundings_y.push(parseInt(y))

      // Now: need to find minimum among these places.
      // Approach:
      // 1. Binary search through x_incr to find x-coord.
      // 2. for loop above and below current index to find matching y-value and index for element
      
      // Get parsed x_incr
      let min_height = value; // min height to find rel min
      let min_height_id = id; // id of rel min

      console.log("checkpoint 2")


      // Looping through surroundings - finding minimum height and id among grooup
      for (let i = 0; i < surroundings_x.length; i++) {
        //console.log("again!")
        // Obtains an index of an element with the right x-coordinate
        let temp_index = binarySearch_2d(x_incr_array, parseInt(surroundings_x[i]), parseInt(2))
       // console.log("temp index: ", temp_index)
       // console.log("surroundings x: ", surroundings_x[i])
        //console.log(x_incr_array)
        let real_id = regional_search_x(x_incr_array, temp_index, surroundings_x[i], surroundings_y[i])

        if (real_id != -1) {
        surroundings_id.push(real_id)

        //console.log("real id: ", real_id)

        if (GPS_locations[real_id][1] < min_height){
          min_height = GPS_locations[real_id][1];
          min_height_id = real_id;
        }
      }
      }

      // We now have the minimum height and index of the current element and surroundings
      // Now check if the element is already part of rel min group and if not, make one.

      /*
      Scenarios
      
      Is the current point already in a pool? Cancel. Don't do anything.
      If other elements are in pool add them anyway

      Does a pool already exist with the min height? Yes - join it INDIVIDUALLY. No - continue.
      
      If we made it to here:
      Create a NEW pool with all elements
      
      */

      let is_inpool = false; // element is already in a group of rel mins
      let min_height_pool_exists = false; // pool with min height exists

      // is_inpool condition
      for (let i = 0; i < pools.length; i++) {
        for (let j = 0; j < pools[i].length; j++) {
          if (pools[i][j] == id) {
            is_inpool = false;
          }
        }
      }

      //console.log("checkpoint 3")


      let pool_i = 0;
      // min_height_pool_exists condition
      for (let i = 0; i < rel_mins.length; i++) {
        if (rel_mins[i] == min_height_id) { // min height pool exists
          min_height_pool_exists = true;
        }
      }

      if (is_inpool == false && min_height_pool_exists == true) {
        // Join existing pool individually
        //pools[pools.length - 1].push(id); // NOTE: MUST FIX LINE

      } else if (is_inpool == false && min_height_pool_exists == false) {
        // Create new pool
        rel_mins.push(min_height_id)

        pools.push(surroundings_id[0]); // add first surroundings_id element
        for (let i = 1; i < surroundings_id; i++) {
          pools[pools.length - 1].push(surroundings_id[i]); // add final elements to extension of pools
        }
      }


    }
  }

  console.log("checkpoint 4")


  // Pools are generated
  console.log("Relative minimums:");
  for (let i = 0; i < rel_mins.length; i ++) {
    console.log(" ,", rel_mins[i])
  }



}


// Searches about and below index in x-coordinates to find the matching y-value
// array, index to start at, x-index to know when to stop, y value to look for
function regional_search_x(array, index, x_ref, y) {
  let p = index + 1; // index above to search
  let n = index - 1; // index below to search

  /*console.log("index: ", index)
  console.log("x_ref: ", x_ref)
  console.log("y: ", y)
  console.log("p: ", p)
  console.log("n: ", n) */



  /*console.log(array)
  console.log(index)
  console.log(p);
  console.log(array[p][2])
  console.log(x_ref)
  console.log(y)*/

  /*console.log(array[index][2])
  console.log(array[p][2])
  console.log(x_ref) */

  while (array[p][2] == x_ref && p < entries) {// pos 2 = x coordinate
    //console.log("part 1")

      if (array[p][3] == y)
        return array[p][0]; // return index of official element

    p++;
  }

  while (array[n][2] == x_ref && n > 0){ // {// pos 2 = x coordinate
    //console.log("part 2")

      if (array[n][3] == y)
        return array[n][0]; // return index of official element

      n--;
  }
//console.log("automatic fail?")
  return -1;
}


// Looks through 2D array for binary search operation.
// Need 2D array, value to look for, and col_position to look for it in
// Entries = num entries 
function binarySearch_2d(array, value, col_position) {
  // Recall: entries = 169017
  let lower = 1;
  let upper = entries;
  let mid;

  while (upper >= lower) {
    mid = Math.floor((upper + lower) / 2);
    /*console.log("x value: ", value)
    console.log("array x value: ", array[mid][col_position])
    console.log("Lower: ", lower)
    console.log("Mid: ", mid)
    console.log("Upper: ", upper) */


    // element is middle
    if (array[mid][col_position] == value)
      return mid;
      //return array[mid][0]; // return the ID of the element

    // element is < or >
    if (array[mid][col_position] > value) {
      upper = mid - 1;
    } else { // array < value
      lower = mid + 1;
    }

  }
  
  return -1;
}

// Download CSV
export function downloadCSV(data, filename="data.csv"){
  try {
    // Format data into 2D array before parsing
    const formattedData = Array.isArray(data[0]) ? data : [data];

    // Convert to CSV
    const csv = Papa.unparse(formattedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} catch (error) {
    console.error("Error generating CSV:", error);
}
}


// Parse CSV
// We need to wait for CSV to be parsed, so NO async
export async function parseCSV(file_location) {

  let array = "";
          
        // async function within to satisfy 'await' 
          const fetchCSV = async () => {
            try {
              // Obtain file text
              const response = await fetch(file_location);
              const text = await response.text();
      
              // Parse using papaparse
              Papa.parse(text, {
                // Once complete
                complete: function(result) {
                  array = result.data
                },
                error: (parseError) => {
                  console.error("Parsing error:", parseError);
                },
                header: false,
                dynamicTyping: true
              });

              // Error obtaining text
            } catch (fetchError) {
              console.error("Fetch error:", fetchError);
            }

            return array;
          };
      
          return await fetchCSV();
}