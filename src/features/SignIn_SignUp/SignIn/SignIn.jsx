import React from 'react'

import "../SignIn_SignUp.scss";
import SignInFunc from "./Functions";
import {signInWithGoogle, signInWithFacebook} from "../../../app/firebase";

import useInput from "../../../Hooks/useInput";

import { Link } from "react-router-dom";

export default function SignIn() {

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    return (
        <div className="SignIn_SignUp">
            <h1>This is  SignIn page</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                SignInFunc(email, password);
                }}>
                <input type="text" placeholder="email" value={email} onChange={setEmail}/>
                <input type="password" placeholder="password" value={password} onChange={setPassword}/>
                <button type="submit">SignIn</button>
            </form>
            <button onClick={signInWithGoogle}>Sign in with google</button>
            <button onClick={signInWithFacebook}>Sign in with facebook</button>
            <Link to="/SignUp">SignUp</Link>
        </div>
    )
}