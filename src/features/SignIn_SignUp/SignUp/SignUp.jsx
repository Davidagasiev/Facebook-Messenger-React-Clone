import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../SignIn_SignUp.scss";
import SignUpFunc from "./Functions";
import {signInWithGoogle, signInWithFacebook} from "../../../app/firebase";
import {UsersSelector} from "../../Users/UsersSlice";

import useInput from "../../../Hooks/useInput";

export default function SignUp() {

    const [username, setUsername] = useInput("");
    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const users = useSelector(UsersSelector);

    return (
        <div className="SignIn_SignUp">
            <h1>This is  SignUp page</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                SignUpFunc(username, email, password);
                }}>
                <input type="text" placeholder="username" value={username} onChange={setUsername}/>
                <input type="text" placeholder="email" value={email} onChange={setEmail}/>
                <input type="password" placeholder="password" value={password} onChange={setPassword}/>
                <button type="submit">SignIn</button>
            </form>
            <button onClick={() => signInWithGoogle(users)}>Sign in with google</button>
            <button onClick={() => signInWithFacebook(users)}>Sign in with facebook</button>
            <Link to="/SignIn">SignIn</Link>
        </div>
    )
}