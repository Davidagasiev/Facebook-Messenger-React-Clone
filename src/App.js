import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { Route, Switch } from "react-router-dom";

import { auth, db } from "./app/firebase";

import {setCurrentUser} from "./features/Users/CurrentUserSlice";
import {updateUsers} from "./features/Users/UsersSlice";

import SignIn from "./features/SignIn_SignUp/SignIn/SignIn.jsx";
import SignUp from "./features/SignIn_SignUp/SignUp/SignUp.jsx";
import Main from "./features/Main/Main.jsx";

function App(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //If User Logged In...
        const {displayName, email, uid, photoURL} = authUser;
        dispatch(setCurrentUser({displayName, email, uid, photoURL}));
        props.history.push("/");
      }else{
        //If User Logges Out...
        dispatch(setCurrentUser(null));
        if(props.location.pathname !== "/SignUp") {
          props.history.push("/SignIn");
        }
      }
    })

    return () => {
      unsubscribe();
    }
  }, [ dispatch ])


  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("users").onSnapshot(snapshot => {
        dispatch(updateUsers( snapshot.docs.map(doc => ({ ...doc.data() }))));
      })
  }, [])


  return (
    <div className="App">

        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>
        </Switch>

    </div>
  );
}

export default App;
