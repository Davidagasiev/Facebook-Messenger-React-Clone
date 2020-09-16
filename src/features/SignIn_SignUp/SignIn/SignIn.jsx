import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "../SignIn_SignUp.scss";
import SignInFunc from "./Functions";

import {signInWithGoogle, signInWithFacebook} from "../../../app/firebase";
import {UsersSelector} from "../../Users/UsersSlice";
import useInput from "../../../Hooks/useInput";



export default function SignIn() {

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const users = useSelector(UsersSelector);
    console.log(users)
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
            <button onClick={() => signInWithGoogle(users)}>Sign in with google</button>
            <button onClick={() => signInWithFacebook(users)}>Sign in with facebook</button>
            <Link to="/SignUp">SignUp</Link>
        </div>
    )
}