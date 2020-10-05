import React from 'react'
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import "../SignIn_SignUp.scss";
import SignInFunc from "./Functions";

import Welcome from '../../Welcome/Welcome.jsx';
import {signInWithGoogle, signInWithFacebook} from "../../../app/firebase";
import {UsersSelector} from "../../Users/UsersSlice";
import useInput from "../../../Hooks/useInput";
import { Button, TextField } from '@material-ui/core';



export default function SignIn() {

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const users = useSelector(UsersSelector);
    
    return (
        <div className="SignIn_SignUp">
            <Welcome 
                h1="Welcome to Facebook Messenger Clone" 
                h3="Made by David Agasiev" 
                style={{paddingTop: "50px"}} />
            <div className="sign_nav">
                <NavLink to="/User/SignUp" activeClassName="activeSite">Sign Up</NavLink>
                <NavLink className="site" to="/User/SignIn" activeClassName="activeSite">Sign In</NavLink>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                SignInFunc(email, password);
                }}>
                <TextField type="text" label="Email" value={email} onChange={setEmail}/>

                <TextField type="password" label="Password" value={password} onChange={setPassword}/>
                
                <Button variant="contained" color="primary" type="submit">Sign In</Button>
            </form>
            <div className="quick_access">
                <p>Quick access with</p>
                <div>
                    <button className="signIn_with" style={{backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBNqj_BACxuoGE7co2RFznug8f_xcjNR0Lng&usqp=CAU)"}} onClick={() => signInWithGoogle(users)}></button>
                    <button className="signIn_with" style={{backgroundImage: "url(https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19754.png)"}} onClick={() => signInWithFacebook(users)}></button>
                </div>
            </div>
        </div>
    )
}