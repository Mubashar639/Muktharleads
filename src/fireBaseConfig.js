// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import firebaseadmin from "firebase-admin";
const config = {
  apiKey: "AIzaSyAE6zQaIN3rM1Zc410Rki3sRPtyP00rKiA",
  authDomain: "pune-rent-agreement-3dfd5.firebaseapp.com",
  projectId: "pune-rent-agreement-3dfd5",
  storageBucket: "pune-rent-agreement-3dfd5.appspot.com",
  messagingSenderId: "967889606241",
  appId: "1:967889606241:web:ba4e8ae0a1453c80aebc20",
  measurementId: "G-G81ENMH49L",
};
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
