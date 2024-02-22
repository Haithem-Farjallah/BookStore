// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "bookstore-app-47ae6.firebaseapp.com",
  projectId: "bookstore-app-47ae6",
  storageBucket: "bookstore-app-47ae6.appspot.com",
  messagingSenderId: "833031977105",
  appId: "1:833031977105:web:7d305cad4e97b2d5ace730",
  measurementId: "G-8QGWQPQY0F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
