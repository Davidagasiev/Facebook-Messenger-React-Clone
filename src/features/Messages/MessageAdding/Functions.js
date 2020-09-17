import { db } from "../../../app/firebase";

const AddMessage = (message, resetMessage, uid) => {
    if(message !== "" && message.split("").some(char => char !== " ")){
        const currentDate = new Date();
        db.collection("messages").add({
            text: message,
            uid,
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
            window.scrollTo(0, document.body.clientHeight);
        })
        .catch(function(error) {
            alert(error.message);
        });
    }
}

export default AddMessage;