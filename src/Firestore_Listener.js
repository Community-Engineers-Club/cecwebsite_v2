import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, Timestamp } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./Firebase.js";

// Email: user20@gmail.com, Password: "password5"

// With Authentication Process
const Firestore_Listener = (docPath, email, password) => {
    // Meaningful Database values to return
    const [counterVal, setCounter] = useState("(LOADING DATA)");
    const [lastMemoryClearVal, setLastMemoryClear] = useState("(LOADING DATA)");
    const [lastUpdateVal, setLastUpdate] = useState("(LOADING DATA)");
    const [nextMemoryClearVal, setNextMemoryClear] = useState("(LOADING DATA)");
    const [nextUpdateVal, setNextUpdate] = useState("(LOADING DATA)");

    // Temperauture and Humidity Measurements
    const [tempArray, setTempArray] = useState([]);
    const [humidArray, setHumidArray] = useState([]);


    
    // Error and Loading values
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    let unsubscribe;

    const authenticate = async () => {
    try {
        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
        
        
        const docRef = doc(db, docPath);
        unsubscribe = onSnapshot(docRef, (docSnap) => {

            // Post update
            if (docSnap.exists() && docPath == "arduino/post") {
                const data = docSnap.data();
                const lastUpdate = data.lastUpdate;
                const lastMemoryClear = data.lastMemoryClear;
                const counter = data.counter;
                console.log("Database Update Noticed.");

                // Counter
                if (counter) {
                    setCounter(counter);
                } else{
                    console.warn("Counter not found");
                }

                // lastUpdate and lastMemoryClear
                if (lastUpdate && lastMemoryClear) {
                    // Update respective values: lastUpdate and lastMemoryClear
                    const d1 = new Date(lastUpdate.seconds * 1000)
                    const d2 = new Date(lastMemoryClear.seconds * 1000)
                    setLastUpdate(d1.toLocaleString());
                    setLastMemoryClear(d2.toLocaleString());

                    const update_offset = 1000 * 60 * 60 * 12; // 12 hours in milliseconds until next PING
                    const update_next = new Date(lastUpdate.toMillis() + update_offset);

                    const memory_offset = 1000 * 60 * 60 * 24 * 2; // 48 hours in milliseconds until next MEMORY CLEAR
                    const memory_next = new Date(lastMemoryClear.toMillis() + memory_offset);

                    // Update respective values: nextUpdate and nextMemoryClear
                    setNextUpdate(update_next.toLocaleString());
                    setNextMemoryClear(memory_next.toLocaleString());

                    // Update timestamp2 in Firestore
                    updateDoc(docRef, {
                        nextUpdate: Timestamp.fromDate(update_next),
                        nextMemoryClear: Timestamp.fromDate(memory_next)
                    }).catch((error) => console.error("Error updating timestamp2:", error));
                } else {
                    console.log("Error retrieving timestamps.")
                }
            } else {
                console.log("Doc not post");
            }


            // Measurements update
            if (docSnap.exists() && docPath == "arduino/measurements") {
                const data = docSnap.data();
                setTempArray(data.temperature_range || [])
                setHumidArray(data.humidity_range || [])


            } else {
                console.log("Measurements not post");
            }
        });

    } catch (authError) {
        console.error("Authentication error:", authError);
        setError(authError.message);
        setLoading(false);
        }
    };

    authenticate();

        return () => {
            if (unsubscribe) unsubscribe(); // Cleanup the listener on component unmount
        };
    }, [docPath, email, password]);

    return { counterVal, lastUpdateVal, nextUpdateVal, lastMemoryClearVal, nextMemoryClearVal, humidArray, tempArray, error, loading };
};

export default Firestore_Listener;