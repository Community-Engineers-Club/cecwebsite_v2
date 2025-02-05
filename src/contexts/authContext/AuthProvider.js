import React, { useEffect, useContext, useState } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null); // Current user info: string
    const [userLoggedIn, setUserLoggedIn] = useState(false); // Is user is logged in?: boolean
    const [loading, setLoading] = useState(true); // If trying to load current auth state: boolean

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user) { // User is logged IN: update values
            setCurrentUser({ ...user });

            setUserLoggedIn(true);
            console.log("logged in with: ", user.email )

        } else { // User is logged OUT: update values
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false); // No longer loading - values retrieved
    }

    const values = {
        userLoggedIn,
        currentUser,
        setCurrentUser,
        loading
    }

    // Return AuthContext provider
    return(
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
