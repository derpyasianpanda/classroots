import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDEbJivfEyQFYYKzy0dTEoDtJPi-tSqnUE",
    authDomain: "classroots-hack20.firebaseapp.com",
    databaseURL: "https://classroots-hack20.firebaseio.com",
    projectId: "classroots-hack20",
    storageBucket: "classroots-hack20.appspot.com",
    messagingSenderId: "821372345518",
    appId: "1:821372345518:web:d8d4f8e84ac0391d83a13f",
    measurementId: "G-WLFF8ZH8RK"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const fireauth = firebase.auth();

export { firebase, firestore, fireauth };