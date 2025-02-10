
// THIS IS AN ANALYSIS PAGE. THERE ARE NO RENDERINGS HERE!

import Papa from "papaparse";
/*


What I am doing IN GENERAL:
PART 1 - GPS Coordinates

--Find relative minimums across school:--
1.
Start with second row and loop through all rows - skip last row as well

2.
Within each GPS location:
- Find ones directly NW, N, NE, E, SE, S, SW, W (8 total)
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






/*

Here:
1. Parse y_incr into a array
2. Loop through array by increasing y-coordinate - no skipping.
3. Make array of surrounding components (8 total) x and y coordinates per each element of y_incr array
4a. Loop through array of surrounding components
4b. Do binary search to find y-coordinate through y_incr array. If it doesn't exist, that's ok. Skip.
4c. If y-coordinate exists: do remote search going up and down y-coordinate to find corresponding x-coordinate. If it doesn't exist, that's ok. Skip.
4d. Compare elevation height of each surrounding element to the minimum height. Make new minimum if minimum.
5. After array loop of surrounding elements: go through logic chart to determine actions 
6. Download CSV of pools + rel_mins

*/


// Functions for analyzing csv and determining areas of flooding

  // CSV File locations
  let y_incr = "/Models/y_incr.csv"
  let id_incr = "/Models/value_id_incr.csv"


// Main function
export async function main() {

  // Variables
  let incrYArray = []; // parsed array increasing in y coordinate
  let incrIDArray = []; // parsed array increasing in ID / height
  let rel_mins = []; // id of relative minimums
  rel_mins[0] = []; // initialize first index
  let pools = []; // ids of coordinates that contribute to one pool of flooding

  console.log("starting.")

  // Get parsed array, ordered by y coordinate
  incrYArray = await parseCSV(y_incr); // ordered by y, x's are in random order
  incrIDArray = await parseCSV(id_incr);

  // External loop: through each y: (row_length -2 b/c we don't count 1st + last rows + header)

  // Define internal variables
  let x = 0; // x coordinate - longitude
  let y = 0; // y coordinate - latitude
  let value = 0; // height value of coordinate
  let id = 0; // id value of coordinate

  // Going through each data entry of incrYArray
  for(let vert_index = 1; vert_index < 168521 /* 500 for testing purposes*/; vert_index++) { // excluding first and last latitudes
    console.log(vert_index)
    let surroundings_x = []; // x of surrounding elements: N, S, etc.
    let surroundings_y = []; // y of surrounding elements

    // Fields of current entry
    x = incrYArray[vert_index][2];
    y = incrYArray[vert_index][3];
    value = incrYArray[vert_index][1];
    id = incrYArray[vert_index][0];

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
      // 1. Binary search through y_incr to find y-coord.
      // 2. for loop above and below current index to find matching x-value and index for element
      
      // Relative minimum of surroundings
      let min_height = value; // min height = current
      let min_height_id = id; // min height id = current

      // Looping through surroundings - finding minimum height and id among grooup
      for (let i = 0; i < surroundings_y.length; i++) {

        // Obtains an index of an element with the right x-coordinate
        let temp_index = binarySearch_2d(incrYArray, parseInt(surroundings_y[i]), parseInt(3))

        if (temp_index != -1 ) { // y-coordinate exists. it's ok if it doesn't.
          //console.log("success: ", temp_index, ", y val: ", surroundings_y[i])

          // Find ID of element with specific x, y coordinates
          let real_id = regional_search_x(incrYArray, temp_index, surroundings_x[i], surroundings_y[i])
          //console.log( "temp index:", temp_index, "index: ", real_id, ", x val: ", surroundings_x[i], ", y val: ", surroundings_y[i])

          if (real_id != -1) { // ID exists for search x, y coordinate. it's ok if it doesn't.
    
            //console.log("real id: ", real_id, ", min height: ", min_height)
          if (incrIDArray[real_id][1] < min_height){
            min_height = incrIDArray[real_id][1]; // new min height
            min_height_id = real_id;
          }
        }
        } else {
          console.log("failure")
        }
      }

      /*
          We now have the minimum height and index of the current element and surroundings.
          Step 5: going through logic chart

          Reminder of variables:
          current: x, y, value, id

          min_height: height
          min_height_id: id

          --Global--
          rel_mins: [][] of rel mins
          pools: [][] of pools
      */

      // Check: does current exist in pools? + surroundings rel min exist in pools?
      let inPools = false;
      let inPools_index = -1;
      let minIdInPools = false; // surrounding rel min in pools?
      let minIdInPools_index = -1;

      for(let i = 0; i < pools.length; i++) {
        for (let j = 0; j < pools[i].length; j++) {
          if (pools[i][j] == id) { // current id exists in pools
            inPools = true;
            inPools_index = i; // index of pool (not within the pool gorup)
          }

          if (pools[i][j] == min_height_id) { // min height id in pools (could be surroundings)
            minIdInPools = true;
            minIdInPools_index = i;
          }
        }
      }


// start logic table
      if (inPools) { // cur is in pools: true

        if (rel_mins[0][inPools_index] == id) { // is rel min for pool: true
          if (min_height_id != id) { // is rel min of surroundings: false

            if (minIdInPools) { // min id in pools (aka surrounding rel min exists in pool): true
              // move elements in inPools_index to minIdInPools_index
              for (let j = 0; j < pools[inPools_index]; j++) {
                pools[minIdInPools_index].push(pools[inPools_index][j]) // push to new index
              }
              // remove old results
              pools.splice(inPools_index, 1); // removes inPools_index from pools
              rel_mins.splice(inPools_index, 1); // removes inPools_index from rel mins
             // console.log("option 1")

            } else { // min id in pools (aka surrounding rel min exists in pool): false
              rel_mins[0][inPools_index] = min_height_id; // set new rel_min id
              pools[inPools_index].push(min_height_id); // append new min height to pools
            //  console.log("option 2")

            }

          }

        }

      } else { // cur is in pools: false
        if (min_height_id == id) { // is rel min of surroundings: true
          rel_mins[0].push(id); // push new rel min
          pools.push([id]); // push new pool of rel min
          //console.log("option 3")



        } else { // is rel min of surroundings: false && we know min_height_id != id
          if (minIdInPools) { // min id in pools (aka surrounding rel min exists in pool): true

            pools[minIdInPools_index].push(id); // push cur id to pool of surrounding rel min
           // console.log("option 4")


          } else { // min id in pools (aka surrounding rel min exists in pool): false

            rel_mins[0].push(min_height_id) // new rel min with min height id
            pools.push([min_height_id, id]); // add cur id along with min_height_id to new pools  
           // console.log("option 5")
           // console.log("min height", min_height, "min height id: ", min_height_id, ", id: ", id)
          }

        }

      }
// end logic table


  } // end loop through all data points

  // Download CSV of pools + rel mins
  console.log("rel mins: ", rel_mins)
  console.log("pools: ", pools)
  downloadCSV(rel_mins, "relmins.csv")
  downloadCSV(pools, "pools.csv")

}


// Search above and below index of y-coordinate to find corresponding x

// let real_id = regional_search_x(incrYArray, temp_index, surroundings_x[i], surroundings_y[i])
// temp_index = index of currently selected y
function regional_search_x(y_array, y_index, x_val, y_val) {
  let pos = y_index; // index above to search
  let neg = y_index - 1; // index below to search

  /*console.log("index: ", index)
  console.log("x_ref: ", x_ref)
  console.log("y: ", y)
  console.log("p: ", p)
  console.log("n: ", n) */

  while (y_array[pos][3] == y_val && pos < y_array.length) {// pos 3 = y coordinate

      if (y_array[pos][2] == x_val)
        return y_array[pos][0]; // return index of official element

    pos++;
  }

  while (y_array[neg][3] == y_val && neg > 0){ // {// pos 2 = x coordinate

      if (y_array[neg][2] == x_val)
        return y_array[neg][0]; // return index of official element

      neg--;
  }
//console.log("automatic fail?")
  return -1;
}


// Looks through 2D array for binary search operation.
// Need 2D array, value to look for, and col_position to look for it in
// let temp_index = binarySearch_2d(incrYArray, parseInt(surroundings_y[i]), parseInt(2))
function binarySearch_2d(array, value, col_position) {
  //console.log("array:", array, ", value: ", value, ", col position: ", col_position)
  let lower = 1;
  let upper = array.length - 1;
  let mid;

  while (upper >= lower) {
    mid = Math.floor((upper + lower) / 2);
    //console.log("mid: ", mid)
    /*console.log("x value: ", value)
    console.log("array x value: ", array[mid][col_position])
    console.log("Lower: ", lower)
    console.log("Mid: ", mid)
    console.log("Upper: ", upper) */


    // element is middle
    if (array[mid][col_position] == value)
    {
      //console.log("yay!")
      return mid; // return index for y_incr
    }

    // element is < or >
    if (value < array[mid][col_position]) {
      upper = mid - 1;
    } else { // value > array
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


// Remove smaller pools + respective rel mins
// relmins: 2D array - all elements within first index i, pools: 2D array
export async function reducePools(relmins_location, pools_location) {
  let relmins = await parseCSV(relmins_location);
  let pools = await parseCSV(pools_location);

  let new_relmins = [];
  new_relmins[0] = [];
  let new_pools = [];
  for (let i = 0; i < pools.length; i++) { // loop through pools
    if (pools[i].length > 2) { // if pool length is > 2 ->> keep and push to new arrays
      new_pools.push(pools[i]);
      new_relmins[0].push(relmins[0][i]);
    }
  }

  // Download csv of new files
  downloadCSV(new_relmins, "new_relmins.csv");
  downloadCSV(new_pools, "new_pools.csv");
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