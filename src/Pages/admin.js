import React, {useState} from "react";
import { useAuth } from '../authContext/AuthProvider.js'
import { local_signInWithEmailAndPassword, signOut } from '../authContext/auth.js'
import { getAuth } from "firebase/auth";
import { db } from "../Firebase.js";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore"; 
import Module from "../elements/Module.js";

const admin_email = "testin7583cec@gmail.com";
const admin_user = "admin"; // admin username works as well as the email
let lastClick = 0;
let delay = 20;

const Editor = () => {

        //main();
        const { userLoggedIn } = useAuth()

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [isSigningIn, setIsSigningIn] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const [counter, setCounter] = useState(0);
        const [lastUpdate, setLastUpdate] = useState('');
        const [tempCounter, setTempCounter] = useState('');
    
    
        const onSubmit = async (e) => {
            if (errorMessage != '') {
                setErrorMessage('');
            }

            e.preventDefault()
            if(!isSigningIn) {
                setIsSigningIn(true);
    
                try {
                    await local_signInWithEmailAndPassword(email == admin_user ? admin_email : email, password)
                    console.log("Login successful")
                }
                catch (error) {
                    console.warn("Login failed: ", error.message);
                    setErrorMessage(error.message);
                }
                setIsSigningIn(false)
    
            }
        }
    
        const logOut = async (e) => {
            e.preventDefault()
            await signOut()
            console.log("Sign out successful")
        }

        if(userLoggedIn == true) {
            const user_email = getAuth().currentUser.email
            if (admin_email == user_email) { // admin panel
                return admin_panel();
            } else { // not admin panel
                return otherAccount();
            }
        } else { // not logged in
           // if (lastClick >= (Date.now() - delay))
                //return;
              //lastClick = Date.now();
             // main();
             //reducePools("/Models/relmins.csv", "/Models/pools.csv");
            return Login()
        }

// get Data for admin
async function getValues() {
    // get counter
    const docRef = doc(db, "arduino/post");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        // Counter Update
        setCounter(docSnap.data().counter);

        // Last Update - Update
        const d1 = new Date(docSnap.data().lastUpdate.seconds * 1000) // convert seconds to ms. >> Data( ms )
        setLastUpdate(d1.toLocaleString());
    } else {
        console.log("No such document!");
    }
}

// set Counter
async function updateValues(e) {
    e.preventDefault()
    console.log(tempCounter)

    // Update nextUpdate to system in Firestore Database
    try{
        await updateDoc(doc(db, "arduino/post"), {
            counter: parseInt(tempCounter),
            //lastUpdate: Timestamp.fromDate(new Date()) // Updates with current time
        })
    // Success
    getValues()

    } catch(error) {
    // Fail
    console.error("Error updating counter:", error);
    }
}

// Admin Panel
function admin_panel() {
    
    getValues();

return(
<>
    <p>Hi, you are logged into the admin panel.</p>
    <p>Counter value (only changes if you change it): {counter}</p>
    <p>Last updated time (only changes if you change counter): {lastUpdate}</p>


<form
onSubmit={updateValues}
className="space-y-5"
>
<div>
    <input
    required
    type="number"
    value={tempCounter} onChange={(e) => { setTempCounter(e.target.value) }}
    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    />
</div>

<button
    type="submit"
    disabled={isSigningIn}
    className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
>
    Update
</button>

</form>



<form
onSubmit={logOut}
className="space-y-5"
>   
    <button
    type="submit"
    disabled={isSigningIn}
    className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
    >
    {isSigningIn ? 'Signing Out...' : 'Sign Out'}
    </button>
</form>

</>
)
}



// Non admin account - only offer logout button
function otherAccount() {
    return(
        <>
        <Module type="directory-fas"/>
            <p>Unfortunately, this is not an admin account and you do not have clearence. Try logging out and logging into an admin account.</p>
        <form
        onSubmit={logOut}
        className="space-y-5"
        >
                                
            <button
            type="submit"
            disabled={isSigningIn}
            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
            >
            {isSigningIn ? 'Signing Out...' : 'Sign Out'}
            </button>
        </form>
        
        </>
        )
}





// Login panel
function Login(){
return(
<>
<Module type="directory-fas"/>
<p>Enter login credentials. Only admin accounts have access.</p>
<form
onSubmit={onSubmit}
className="space-y-5"
>
<div>
    <label className="text-sm text-gray-600 font-bold">
        Username:&nbsp;
    </label>
    <input
    required
    value={email} onChange={(e) => { setEmail(e.target.value) }}
    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    />
</div>


<div>
    <label className="text-sm text-gray-600 font-bold">
        Password:&nbsp;
    </label>
    <input
        type="password"
            autoComplete='current-password'
            required
            value={password} onChange={(e) => { setPassword(e.target.value) }}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            />
</div>


<button
    type="submit"
    disabled={isSigningIn}
    className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
>
    {isSigningIn ? 'Signing In...' : 'Sign In'}
</button>

</form>

{errorMessage && (
    <span style={{color: 'red'}} className='text-red-600 font-bold'>{errorMessage}</span>
)}

</>
)
}
}

export default Editor;