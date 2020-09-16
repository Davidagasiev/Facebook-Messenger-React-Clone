import { auth } from "../../../app/firebase";


const SignInFunc = (email, password) => {
    // Signing In
    auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        
    })
    .catch((error) => alert(error.message));
}

export default SignInFunc;