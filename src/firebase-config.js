import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "esfihasapp.firebaseapp.com",
    projectId: "esfihasapp",
    storageBucket: "esfihasapp.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER,
    appId: process.env.REACT_APP_APP_ID,
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);