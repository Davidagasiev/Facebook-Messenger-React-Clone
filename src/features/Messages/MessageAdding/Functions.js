import { db } from "../../../app/firebase";

const AddMessage = (message, resetMessage, currentUser) => {
    if(message !== "" && message.split("").some(char => char !== " ")){
        const currentDate = new Date();
        db.collection("messages").add({
            text: message,
            uid: currentUser.uid,
            date: {
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                time: currentDate.getTime()
            }
        })
        .then(function(docRef) {
            resetMessage();
        })
        .catch(function(error) {
            alert(error.message);
        });
    }
}

export default AddMessage;