import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLESlldcA4G3axJOsIsEFf6_iL8XATd6g",
    authDomain: "react-chat-25999.firebaseapp.com",
    projectId: "react-chat-25999",
    storageBucket: "react-chat-25999.appspot.com",
    messagingSenderId: "909348414158",
    appId: "1:909348414158:web:2ba4e7812f18027161e69f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()