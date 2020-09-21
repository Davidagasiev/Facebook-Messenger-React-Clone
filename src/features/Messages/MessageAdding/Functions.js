import { db } from "../../../app/firebase";

const AddMessage = (message, resetMessage, uid, GId) => {
    if(message !== "" && message.split("").some(char => char !== " ")){
        const currentDate = new Date();
        db.collection("messages").add({
            text: message,
            uid,
            GId,
            date: {
                hours: currentDate.getHours(),
                minutes: currentDate.getMinutes(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                time: currentDate.getTime()
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

export default AddMessage;