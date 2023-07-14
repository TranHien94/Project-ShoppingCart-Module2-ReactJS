// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAszHBEA9fJrlEdLRrwr9YQ7vdQa5Otp7Q",
    authDomain: "shoppingcart-reactjs-e7e41.firebaseapp.com",
    projectId: "shoppingcart-reactjs-e7e41",
    storageBucket: "shoppingcart-reactjs-e7e41.appspot.com",
    messagingSenderId: "66080893817",
    appId: "1:66080893817:web:affbbf8fd1421b61649da8",
    measurementId: "G-8KWR0RTWR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
export const storage=getStorage(app)