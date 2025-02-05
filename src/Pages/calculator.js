import React from "react";
import { parseCSV } from "../Elements/dataAnalysis";

const relmins = [3,5, 7, 9]; // relative minimum id numbers
const pools = [[3, 95, 27], [39, 5, 69], [985, 8489, 7], [90, 900, 9, 9000]]; // pool id numbers


/*

Table of values:

Per bucket tilt: it rains 0.008557 m^3 per 4m^2 area (surface area of each of 169017 coordinate points)

*/

const rainFactor = 0.008557
const id_csv_location = "/Models/value_id_incr.csv"

// calculates distribution of water
// Input:
// relminArray: []
// pools: [[]]
// counter: num
// Returns modified pool list of flooded coordinates (identified by id), counter value -> to know amount of flooding
export async function pool_calculator(pools, counter) {
    let filled_pool = []; // Final array of filled pool buckets
    const id_csv = await parseCSV(id_csv_location); // get id_csv to easily access pool members' id
    const rain_per_bucket = rainFactor * counter; // how much rain per bucket, total



    for (let i = 0; i < pools.length; i++) { // loop through each pool


        // PART 1
        // Sort pools from lowest height to greatest: via MergeSort!
        // get 2d array of index + height
        const array = mergeSort(pools[i]); // ordering ids- fix

        // PART 2

        const aPool_length = array.length // length of selected pool
        let pool_rain = rain_per_bucket * aPool_length; // how much rain distributed across pool

        // Fill coordinate areas: smallest -> largest
        for (let j = 0; j < aPool_length; j++) {
            if ( pool_rain > 0 ) { // how much rain left to be distributed
                let height_difference;
                // Find bucket volume from next area: (note: the next largest bucket WILL be an immediate surrounding)
                if (j + 1 != aPool_length) { // not last element
                height_difference = id_csv[array[j + 1]][1] - id_csv[array[j]][1]; // ex. [[id, height], [id, height]]

                } else { // last element -- height_difference is max
                    height_difference = 2; //placeholder (assume cube)
                }

                const volume = 4 * height_difference; // volume of cube to be filled with water: 4 (m) * height_difference (m)
                pool_rain -= volume; // subtract pool_rain to fill bucket

                // Ensure sub-array exists before pushing
                if (!filled_pool[i]) {
                    filled_pool[i] = [];
                 }
                // append filled/semi-filled cube to filled_pool pool section
                filled_pool[i].push(array[j]); // append index
            }
        }
    }


    return filled_pool; // returns filled pool array
}


// Translate each counter value to a range [20, 40]
// Assumes linear relationship:
// note this means that counter to slider value is linear, but slider value differences from 20 to 21 is
// MUCH SMALLER than differences from 39-40
export function counter_3D_conversion(counter) {

    const counterFactor = 0.2 // factor: converts 1 counter to a change in slider value
    const conversionFormula = 20 + (counter * counterFactor); // the new slider value

    return parseInt(conversionFormula);
}


// MergeSort - main header
export function mergeSort(array) {
    if (array.length <= 1)
        return array;

    let middle = Math.floor(array.length / 2);
    let leftArray = [];
    let rightArray = [];

    // Split arrays
    for (let i = 0; i < middle; i ++) {
        leftArray.push(array[i]);
    }
    for (let i = middle; i < array.length; i ++) {
        rightArray.push(array[i]);
    }

    let sortedLeft = mergeSort(leftArray);
    let sortedRight = mergeSort(rightArray);

    return merge(sortedLeft, sortedRight);
}

// Recombination
function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i += 1;
        } else {
            result.push(right[j]);
            j += 1;
        }
    }

    for (i; i < left.length; i++) {
        result.push(left[i]);
    }
    for (j; j < right.length; j++) {
        result.push(right[j]);
    }

    return result;

}

/*
2D ARRAY MERGE SORT ARCHIVE

// MergeSort - main header
export function mergeSort(array2d) {
    // Note array is 2D.
    if (array2d.length <= 1) // outer array length
        return array2d;

    let middle = Math.floor(array2d.length / 2);
    let leftArray = [];
    let rightArray = [];

    // Split arrays
    leftArray = array2d.slice(0, middle);
    rightArray = array2d.slice(middle, array2d.length);
    /*
    for (let i = 0; i < middle; i++) {
        leftArray[i] = (array2d[i]);
        rightArray[i] = (array2d[middle + i]);
    }*/

    //console.log("left array: ", leftArray);
    //console.log("right array: ", rightArray);
/*
    let sortedLeft = mergeSort(leftArray);
    let sortedRight = mergeSort(rightArray);

    return merge(sortedLeft, sortedRight);
}*/

// Recombination
/*function merge(left, right) {
    // left and right are 1D arrays
    let result = []; // 2D array recombination: [id, height]
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i][1] < right[j][1]) { // compare heights
            result.push(left[i]);
            i += 1;
        } else {
            result.push(right[j]);
            j += 1;
        }
    }

    for (i; i < left.length; i++) {
        result.push(left[i]);
    }
    for (j; j < right.length; j++) {
        result.push(right[j]);
    }
    //console.log("result: ", result)
    return result;

}*/