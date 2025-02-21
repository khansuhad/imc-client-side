// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const all = import.meta.env
const firebaseConfig = {
  apiKey: "AIzaSyBQlE2hCuMWJ1oziZF_Krbo9hzkqiLFVuc",
  authDomain: "infinitymathcenter-54ed2.firebaseapp.com",
  projectId: "infinitymathcenter-54ed2",
  storageBucket: "infinitymathcenter-54ed2.firebasestorage.app",
  messagingSenderId: "523806900401",
  appId: "1:523806900401:web:c39f7d01162e653d73e290"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth