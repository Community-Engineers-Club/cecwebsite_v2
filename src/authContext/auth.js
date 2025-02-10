import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const local_signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// Sign Out
export const signOut = () => {
    return auth.signOut();
}