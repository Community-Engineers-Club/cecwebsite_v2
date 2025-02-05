import React, { useState } from 'react'
import { local_signInWithEmailAndPassword, signOut } from '../auth.js'
import { useAuth } from '../contexts/authContext/AuthProvider.js'
import { main } from '../Elements/dataAnalysis.js';
import { Navigate } from 'react-router-dom';


// Admin:
const admin_user = "admin";
const admin_email = "testin7583cec@gmail.com";

const Login = () => {

    //main();

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true);

            try {
                await local_signInWithEmailAndPassword(email, password)
                console.log("Login successful")
            }
            catch (error) {
                console.warn("Login failed: ", error.message);
            }
            setIsSigningIn(false)

        }
    }

    const logOut = async (e) => {
        e.preventDefault()
            await signOut()
    }

    return(
        <>
            {/*userLoggedIn && (<Navigate to={'/home'} replace={true}/>)*/}
            {userLoggedIn && <Navigate to={'/editor'} replace={true}/>}


            <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Username:&nbsp;
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
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

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>

                    </form>

                    {userLoggedIn && 
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
                    
                    }
        </>
    )
}

export default Login;