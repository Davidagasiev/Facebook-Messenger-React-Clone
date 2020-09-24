import {db, storage} from "../../app/firebase";
import {v4 as uuid} from "uuid"


export function changeUserName(e, uid, displayName, photoURL) {
    e.preventDefault();
    db.collection("users").doc(uid).set({
        uid,
        displayName,
        photoURL
    })
    .then(() => {
        alert("Your UserName Was successfully.");
    })
    .catch(error => {
        alert(error.message);
    })
}


export function changeUserImage(e, uid, displayName) {
    if(e.target.files[0]){
        const UImage = e.target.files[0];
        
        const newUserImageId = uuid();
        const uploadTask = storage.ref(`images/${newUserImageId}`).put(UImage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref("images")
                .child(newUserImageId)
                .getDownloadURL()
                .then(url => {
                    
                    db.collection("users").doc(uid).set({
                            displayName,
                            photoURL: url,
                            uid
                            })
                            .then(function(docRef) {
                            })
                            .catch(function(error) {
                            });   
                })
            }
        )
    }
    
}