import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB78r6uZ9UQfbu5-debTZbOS8dbdIod9u4",
  authDomain: "gombak-jungle-school-6be9a.firebaseapp.com",
  databaseURL: "https://gombak-jungle-school-6be9a.firebaseio.com",
  projectId: "gombak-jungle-school-6be9a",
  storageBucket: "gombak-jungle-school-6be9a.appspot.com",
  messagingSenderId: "758117696829",
  appId: "1:758117696829:web:da502895ade86bec0cb154",
  measurementId: "G-16MXNZZVPX"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;