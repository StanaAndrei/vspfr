import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAapo6uX6GbjRWr3t1OOwRJLlVve32qCIU",
    authDomain: "testproj-4efb8.firebaseapp.com",
    projectId: "testproj-4efb8",
    storageBucket: "testproj-4efb8.appspot.com",
    messagingSenderId: "383510105590",
    appId: "1:383510105590:web:0ebcb7553139b747758bd7",
    measurementId: "G-N7HK7JWTNH"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);