import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOMEcVnwkTCrMWNGt1XqB8E71gTDTtOy0",
    authDomain: "studyapp-5903b.firebaseapp.com",
    projectId: "studyapp-5903b",
    storageBucket: "studyapp-5903b.appspot.com",
    messagingSenderId: "920224478087",
    appId: "1:920224478087:web:9aea5fc60688097be6d922",
    measurementId: "G-9EWS4H8J5W"
  };
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);



export {storage, db}