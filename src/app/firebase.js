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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)
    .then(result => {
        const user = result.user;

        db.collection("users").doc(user.uid).set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        .then(function(docRef) {
          //   console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          //   console.error("Error adding document: ", error);
        });

    });

    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    facebookProvider.setCustomParameters({ prompt: 'select_account' });
    export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider)
        .then(result => {
            const user = result.user;
    
            db.collection("users").doc(user.uid).set({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            })
            .then(function(docRef) {

            })
            .catch(function(error) {
                
            });
    
        });

export {db, auth, storage};