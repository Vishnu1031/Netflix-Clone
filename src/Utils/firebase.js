// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0anWLA5tJRI0qfUWhVDB6Hv5BxLBhhcU",
  authDomain: "netflix-clone-13b43.firebaseapp.com",
  projectId: "netflix-clone-13b43",
  storageBucket: "netflix-clone-13b43.appspot.com",
  messagingSenderId: "746188825952",
  appId: "1:746188825952:web:9fdae7fd96872020682a05",
  measurementId: "G-G9RMBYKCR2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
