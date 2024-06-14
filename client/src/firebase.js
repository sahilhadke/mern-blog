// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OAUTHAPI,
  authDomain: "mern-blog-b700c.firebaseapp.com",
  projectId: "mern-blog-b700c",
  storageBucket: "mern-blog-b700c.appspot.com",
  messagingSenderId: "722897236544",
  appId: "1:722897236544:web:97003603557c6e070f25a5"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);