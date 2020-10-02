import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Route, Switch } from "react-router-dom";
import "./App.scss";

import { auth, db } from "./app/firebase";

import {setCurrentUser, CurrentUserSelector} from "./features/Users/CurrentUserSlice";
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

        if(props.location.pathname === "/SignUp" || props.location.pathname === "/SignIn"){
          props.history.push("/");
        }

      }else{
        //If User Logges Out...
        dispatch(setCurrentUser(null));
        if(props.location.pathname !== "/SignIn") {
          props.history.push("/SignUp");
        }else if(props.location.pathname !== "/SignUp"){
          props.history.push("/SignIn");
        }
      }
    })

    return () => {
      unsubscribe();
    }
  }, [ dispatch ])

  const currentUser = useSelector(CurrentUserSelector);

  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("users").onSnapshot(snapshot => {
        dispatch(updateUsers( snapshot.docs.map(doc => ({ ...doc.data() }))));
      })
  }, [])

// Dark Mode

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if(window.localStorage.getItem("darkMode")){
      setDarkMode(window.localStorage.getItem("darkMode"))
    }else{
      setDarkMode(false);
    }
  }, [])

  function switchDarkMode() {
    window.localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <div className={`App ${darkMode ? "darkMode" : ""}`}>

        <Switch>
          { currentUser ? 
          <>
            <Route exact path="/:GroupId" component={(RouteProps) => 
              <Main 
                darkMode={darkMode}
                switchDarkMode={switchDarkMode} 
                {...RouteProps} />}
              />
            <Route exact path="/" component={(RouteProps) => 
            <Main 
              darkMode={darkMode}
              switchDarkMode={switchDarkMode}
              match={{params: {GroupId: "Group"}}} />
            }
              />
          </>
            :
          <>
          <Route exact path="/SignIn" component={SignIn}/> 
          <Route exact path="/SignUp" component={SignUp}/>
          </>
          }
        </Switch>

    </div>
  );
}

export default App;
