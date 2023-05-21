import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAHCGj3dHh1sVC9z8BFFgxtmNfEf1S6IOM",
    authDomain: "clone-51bb6.firebaseapp.com",
    projectId: "clone-51bb6",
    storageBucket: "clone-51bb6.appspot.com",
    messagingSenderId: "154742848994",
    appId: "1:154742848994:web:fd39c7ae2e50352f930dbb"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app();

const db = app.firestore();


export default db;