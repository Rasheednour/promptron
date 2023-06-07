// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xlacuMq2DWEkQ6WNUUedtBLmoQAUkKk",
  authDomain: "propty-dumpty.firebaseapp.com",
  projectId: "propty-dumpty",
  storageBucket: "propty-dumpty.appspot.com",
  messagingSenderId: "412204666821",
  appId: "1:412204666821:web:fbbd957997f7dd3c2a85ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
