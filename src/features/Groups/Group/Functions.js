import { db } from "../../../app/firebase";


function DeleteGroup(GMessages, GId, handleClose) {
    handleClose();
    db.collection("groups").doc(GId).delete().then(function() {
        GMessages.forEach(message => {
            db.collection("messages").doc(message.id).delete().then(function() {
                console.log("message was delated")
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        })
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export {DeleteGroup};