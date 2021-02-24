// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import firebaseadmin from "firebase-admin";
const config = {
  apiKey: "AIzaSyAdf4Et8FFK3HWWWZiOD216h4kwjtRisYQ",
  authDomain: "pune-rent-agreement.firebaseapp.com",
  projectId: "pune-rent-agreement",
  storageBucket: "pune-rent-agreement.appspot.com",
  messagingSenderId: "962520393349",
  appId: "1:962520393349:web:3c047f5969509a2616abec",
  measurementId: "G-SD4LSCVZCQ",
};
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
