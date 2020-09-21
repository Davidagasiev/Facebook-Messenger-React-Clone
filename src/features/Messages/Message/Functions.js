import {db} from "../../../app/firebase";

function createDate(date) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${months[date.month]} ${date.day}, ${date.year} at ${date.hours}:${date.minutes}`;
}


function deleteMessage(messageId, handleClose) {
    db.collection("messages").doc(messageId).delete().then(function() {
        handleClose();
        console.log("Message was deleted");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


export {createDate, deleteMessage};