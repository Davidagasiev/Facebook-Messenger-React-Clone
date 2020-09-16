import { db, auth } from "../../../app/firebase";


const SignUpFunc = (username, email, password) => {
    // Signing Up
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
        db.collection("users").doc(authUser.user.uid).set({
          uid: authUser.user.uid,
          displayName: username.split(' ').join(''),
          photoURL: "https://us.v-cdn.net/6022045/uploads/defaultavatar.png"
      })
      .then(function(docRef) {
        //   console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        //   console.error("Error adding document: ", error);
      });

      return authUser.user.updateProfile({
        displayName: username.split(' ').join(''),
        photoURL: "https://us.v-cdn.net/6022045/uploads/defaultavatar.png"
      })
    })
    .catch(error => alert(error.message));
     
}

export default SignUpFunc;
