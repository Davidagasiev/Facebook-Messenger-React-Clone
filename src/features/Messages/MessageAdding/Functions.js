import { db, storage } from "../../../app/firebase";
import {v4 as uuid} from "uuid";

export const AddMessage = (message, resetMessage, uid, GId) => {
    if(message !== "" && message.split("").some(char => char !== " ")){
        const currentDate = new Date();
        db.collection("messages").add({
            type: "text",
            text: message,
            uid,
            GId,
            date: {
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                time: currentDate.getTime(),
                day: currentDate.getUTCDate()
            }
        })
        .then(function(docRef) {
            const chat = document.getElementsByClassName("chat")[0];
            chat.scrollTo(0, chat.scrollHeight);
            resetMessage();
        })
        .catch(function(error) {
            alert(error.message);
        });
    }
}

export const handlePhotoChange = (e, setUpload, setChosenFile) => {
    if(e.target.files[0]){
        setUpload(e.target.files[0]);
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    setChosenFile(e.target.result);
                }
                
                reader.readAsDataURL(e.target.files[0]);    
    }
}

export const AddPhotoMessage = (upload, setUpload, setChosenFile, uid, GId, setSendDisabled) => {
        setSendDisabled(true);
        const newMessageId = uuid();
        const uploadTask = storage.ref(`images/${newMessageId}`).put(upload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref("images")
                .child(newMessageId)
                .getDownloadURL()
                .then(url => {
                    const currentDate = new Date();
                    db.collection("messages").add({
                        type: "photo",
                        photo: url,
                        uid,
                        GId,
                        date: {
                            hours: currentDate.getHours(),
                            minutes: currentDate.getMinutes(),
                            month: currentDate.getMonth(),
                            year: currentDate.getFullYear(),
                            time: currentDate.getTime(),
                            day: currentDate.getUTCDate()
                        }
                    })
                    .then(function(docRef) {
                        const chat = document.getElementsByClassName("chat")[0];
                        chat.scrollTo(0, chat.scrollHeight);
                        setChosenFile("");
                        setUpload(null);
                        setSendDisabled(false);
                    })
                    .catch(function(error) {
                        alert(error.message);
                    });
                })
            }
        )
}




export const handleFileChange = (e, setUpload) => {
    if(e.target.files[0]){
        setUpload(e.target.files[0]);
    }
}

export const AddFileMessage = (upload, setUpload, uid, GId, setSendDisabled) => {
        setSendDisabled(true);
        const newMessageId = uuid();
        const uploadTask = storage.ref(`files/${newMessageId}`).put(upload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref("files")
                .child(newMessageId)
                .getDownloadURL()
                .then(url => {
                    const currentDate = new Date();
                    db.collection("messages").add({
                        type: "file",
                        file: url,
                        fileName: upload.name,
                        uid,
                        GId,
                        date: {
                            hours: currentDate.getHours(),
                            minutes: currentDate.getMinutes(),
                            month: currentDate.getMonth(),
                            year: currentDate.getFullYear(),
                            time: currentDate.getTime(),
                            day: currentDate.getUTCDate()
                        }
                    })
                    .then(function(docRef) {
                        const chat = document.getElementsByClassName("chat")[0];
                        chat.scrollTo(0, chat.scrollHeight);
                        setUpload(null);
                        setSendDisabled(false);
                    })
                    .catch(function(error) {
                        alert(error.message);
                    });
                })
            }
        )
}