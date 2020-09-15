import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBvYNzHiJt8aOjXyDlD-PDm5YA0XKOgKXQ",
    authDomain: "facebook-messenger-react-clone.firebaseapp.com",
    databaseURL: "https://facebook-messenger-react-clone.firebaseio.com",
    projectId: "facebook-messenger-react-clone",
    storageBucket: "facebook-messenger-react-clone.appspot.com",
    messagingSenderId: "1024419882380",
    appId: "1:1024419882380:web:a590b60bdaba4c39a3e2a9",
    measurementId: "G-766RSQ5RBM"
});

const 
    db      = firebaseApp.firestore(),
    auth    = firebase.auth(),
    storage = firebase.storage();


export {db, auth, storage};