import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../Firebase.js";
import { signOut, getAuth } from "firebase/auth";


// Firestore Database - Document Paths
const docPath_post = "arduino/post";
const docPath_measurements = "arduino/measurements";


export async function getApiKey() {
    const docRef = doc(db, "arduino/private");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().apikey
    } else {
        console.log("No such document.");
        return null;
    }
}

// Requires some authentication
export async function getAdminEmail() {
    const docRef = doc(db, "arduino/private");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().admin_email
    } else {
        console.log("No such document.");
        return null;
    }
}

export async function getCounter() {
    const docRef = doc(db, "arduino/post");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().counter
    } else {
        console.log("No such document.");
        return null;
    }
}

// Requires NO authentication
export async function getUserEmail() {
    const docRef = doc(db, "arduino/public");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().user_email
    } else {
        console.log("No such document.");
        return null;
    }
}

// Requires NO authentication
export async function getUserPassword() {
    const docRef = doc(db, "arduino/public");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().user_password
    } else {
        console.log("No such document.");
        return null;
    }
}

// Listener to Firestore Database - Authentication required
// NOTE: Can create multiple instances of this
const Firestore_Listener = (docPath) => {

    const { userLoggedIn } = getAuth()

    // Post - data fields: counter, lastUpdate
    // Requirements: read - PUBLIC + ADMIN, write - ADMIN
    const [counterVal, setCounter] = useState(0);
    const [lastUpdateVal, setLastUpdate] = useState("N/A");

    // Measurements - data fields: lastHumidity, lastTemperature
    // Requirements: read - PUBLIC + ADMIN, write - ADMIN
    const [lastHumidVal, setLastHumid] = useState("N/A");
    const [lastTempVal, setLastTemp] = useState("N/A");

    // Public - data fields: nextUpdate
    // Requirements: read - PUBLIC + ADMIN, write - PUBLIC + ADMIN
    const [nextUpdateVal, setNextUpdate] = useState("N/A");
    
    // Error and Loading values
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



// Async logout function upon unsubscribe
const logOut = async (e) => {
    e.preventDefault()
        await signOut()
}


function postDoc(docSnap, docRef) {
    const data = docSnap.data();
    const lastUpdate = data.lastUpdate;
    const counter = data.counter;
    console.log("Database Update registered.");

    // Counter: exists, update local counter value
    if (counter) {
        setCounter(counter);
    } else{
        console.warn("Counter not found");
    }

    // lastUpdate: exists, update local lastUpdate value + update local & system nextUpdate value
    if (lastUpdate) {
        // lastUpdate - local update 
        const d1 = new Date(lastUpdate.seconds * 1000) // convert seconds to ms. >> Data( ms )
        setLastUpdate(d1.toLocaleString());

        // nextUpdate - local update
        const update_offset = 1000 * 60 * 60 * 8; // 8 hours in milliseconds until next PING
        const update_next = new Date(lastUpdate.toMillis() + update_offset);
        setNextUpdate(update_next.toLocaleString());

        // Update nextUpdate to system in Firestore Database 
        updateDoc(doc(db, "arduino/public"), {
            nextUpdate: Timestamp.fromDate(update_next),
        }).catch((error) => console.error("Error updating nextUpdate timestamp:", error));
    } else {
        console.log("Error retrieving timestamps.")
    }
}

function measurementDoc(docSnap, docRef) {
    const data = docSnap.data();
    const lastHumidity = data.lastHumidity
    const lastTemperature = data.lastTemperature

    // Counter: exists, update local counter value
    if (lastHumidity && lastTemperature) {
        setLastHumid(lastHumidity);
        setLastTemp(lastTemperature);
    } else{
        console.warn("Counter not found");
    }
}

useEffect(() => {
    let unsubscribe;

    const authenticate = async () => {
    try {
        // Sign in the user if credentials were given
            if (!userLoggedIn) {
            const userCredential = await signInWithEmailAndPassword(auth, await getUserEmail(), await getUserPassword());
            console.log("User signed in:", userCredential.user);
            }
        
        const docRef = doc(db, docPath);
        unsubscribe = onSnapshot(docRef, (docSnap) => {

            // Post Document - Update
            if (docSnap.exists() && docPath == docPath_post) {
                postDoc(docSnap, docRef)
            } else {
                console.log("Doc selected not 'post'");
            }


            // Measurements Document - Update
            if (docSnap.exists() && docPath == docPath_measurements) {
                measurementDoc(docSnap, docRef)
            } else {
                console.log("Doc selected not 'Measurements'");
            }
        });

    // If sign in fails
    } catch (authError) {
        console.error("Authentication error:", authError);
        setError(authError.message);
        setLoading(false);
        }
    };

    authenticate(); // Run authenticate function

        return () => {
            // Below does not work:
            if (unsubscribe) {
                unsubscribe(); // Cleanup the listener on component unmount
                // Log out once snapshot ends - does not work?
                logOut();
            }

        };
    }, [docPath]);

    return { counterVal, lastUpdateVal, nextUpdateVal, lastHumidVal, lastTempVal, error, loading };
};

export default Firestore_Listener