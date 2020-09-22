import {db, storage} from "../../../app/firebase";
import {v4 as uuid} from "uuid"


export function changeGName(newGName, GId, GImage) {
    db.collection("groups").doc(GId).set({
        GName: newGName,
        GImage
    })
}


export function changeGImage(e, GId, GName) {
    if(e.target.files[0]){
        const GImage = e.target.files[0];
        
        const newGroupImageId = uuid();
        const uploadTask = storage.ref(`images/${newGroupImageId}`).put(GImage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref("images")
                .child(newGroupImageId)
                .getDownloadURL()
                .then(url => {
                    
                    db.collection("groups").doc(GId).set({
                            GName,
                            GImage: url
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