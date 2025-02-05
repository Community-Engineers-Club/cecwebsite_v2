import React, {useState} from "react";
import { useAuth } from '../../contexts/authContext/AuthProvider.js'
import { local_signInWithEmailAndPassword, signOut } from '../../auth.js'
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { mergeSort, pool_calculator } from "../calculator.js";

/* Login Credentials:

Email, Password
testin7583cec@gmail.com, it984465 ** ADMIN
user20@gmail.com, password5
admin10@gmail.com, password5

*/

const admin_email = "testin7583cec@gmail.com";
const admin_user = "admin"; // admin username works as well as the email

const Editor = () => {

        //main();
        const { userLoggedIn } = useAuth()

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [isSigningIn, setIsSigningIn] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const [counter, setCounter] = useState(0);
        const [tempCounter, setTempCounter] = useState('');
        const [updateResult, setUpdateResult] = useState(false);
    
    
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
            return Login()
        }

// get Data for admin
async function getCounter() {
    const docRef = doc(db, "arduino/post");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCounter(docSnap.data().counter);
    } else {
        console.log("No such document!");
    }


    // Testing
    let array = [[6, 3, 2, 8, 2, 8, 3, 7, 4689, 248], [4, 3, 8, 2, 8, 20, 49, 3]];
    console.log(array);
    console.log("filled pool test: ", await pool_calculator(array, counter))
}

function isNumber(value) {
    return typeof value === 'number';
}

// set Counter
async function updateCounter(e) {
    e.preventDefault()
    console.log(tempCounter)

    // Update nextUpdate to system in Firestore Database
    try{
        await updateDoc(doc(db, "arduino/post"), {
            counter: parseInt(tempCounter),
        })
    // Success
    getCounter()

    } catch(error) {
    // Fail
    console.error("Error updating counter:", error);
    }
}

// Admin Panel
function admin_panel() {
    
    getCounter();

return(
<>
    <p>Hi, this is the real admin panel.</p>
    <p>Counter value (only changes if you change it): {counter}</p>


<form
onSubmit={updateCounter}
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
            <p>Hi, this is not an admin account. You do not have access.</p>
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