import React from 'react'

import "../SignIn_SignUp.scss";
import SignInFunc from "./Functions";

import useInput from "../../../Hooks/useInput";

import { Link } from "react-router-dom";

export default function SignIn() {

    const [email, setEmail, resetEmail] = useInput("");
    const [password, setPassword, resetPassword] = useInput("");

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
            <Link to="/SignUp">SignUp</Link>
        </div>
    )
}