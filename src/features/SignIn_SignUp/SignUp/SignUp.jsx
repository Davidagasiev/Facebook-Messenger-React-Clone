import React from 'react'
import { Link } from "react-router-dom";

import "../SignIn_SignUp.scss";
import SignUpFunc from "./Functions";

import useInput from "../../../Hooks/useInput";

export default function SignUp() {

    const [username, setUsername, resetUserName] = useInput("");
    const [email, setEmail, resetEmail] = useInput("");
    const [password, setPassword, resetPassword] = useInput("");

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
            <Link to="/SignIn">SignIn</Link>
        </div>
    )
}