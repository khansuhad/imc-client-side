import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
     const provider = new GoogleAuthProvider();
     const githubProvider = new GithubAuthProvider();
    const [user , setUser] = useState();
    const [loader , setLoader] = useState(true) 
        
        const createUser = (email , password ) => {
            setLoader(true);
            return createUserWithEmailAndPassword(auth , email , password);
        }
        const loginUser = (email, password) => {
            setLoader(true)
            return signInWithEmailAndPassword(auth , email , password);
        }
     const logOut = () => {
        setLoader(true)
        return signOut(auth);
     }
    useEffect(() => {
       const unSubscribe =  onAuthStateChanged(auth , currentUser => {
            setLoader(false)
            setUser(currentUser); 
        })
        return () => {
            unSubscribe();
        }
    },[])
    
        const googleLogin = () =>{
            return signInWithPopup(auth , provider)
        }
        const githubLogin = () =>{
            return signInWithPopup(auth ,githubProvider)
        }
    
        const authInfo = {
            createUser,
            loginUser,
            logOut,
            setUser,
            user,
            loader,
            githubLogin,
            googleLogin,
        
        }; 
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
  };

export default AuthProvider;