import { storage, db } from "../../../app/firebase";
import {v4 as uuid} from "uuid"

// If Chosen File changes
function handleUpload(e, setGImage, setChosenFile) {
    if(e.target.files[0]){
        setGImage(e.target.files[0]);
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    setChosenFile(e.target.result);
                }
                
                reader.readAsDataURL(e.target.files[0]);    
    }
}

// To create Group

function createNewGroup(event, GName, GImage, setShowProgress, setProgress, resetNewGroupName, setGImage, setChosenFile, handleModalClose) {
    event.preventDefault();

    const newGroupId = uuid();
    const uploadTask = storage.ref(`images/${newGroupId}`).put(GImage);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const newProgress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) *  100
            )
            setShowProgress(true);
            setProgress(newProgress);
        },
        (error) => {
            console.log(error);
        },
        () => {
            storage.ref("images")
            .child(newGroupId)
            .getDownloadURL()
            .then(url => {
                const currentDate = new Date();
                db.collection("groups").add({
                        GName,
                        GImage: url,
                        date: {
                            time: currentDate.getTime()
                        }
                        })
                        .then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            setShowProgress(false);
                            setProgress(0);
                            resetNewGroupName();
                            setGImage(null);
                            setChosenFile("");
                            handleModalClose();
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });   
            })
        }
    )

}


export { handleUpload, createNewGroup };