import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { db } from "./app/firebase";
import {MessageSelector, updateMessages} from "./features/Messages/MessagesSlice";
import MessageList from "./features/Messages/MessageList/MessageList";


function App() {

  const messages = useSelector(MessageSelector);
  const dispatch = useDispatch();

  useEffect(() =>{
    //This is how to get info from firebase
      db.collection("messages").onSnapshot(snapshot => {
        dispatch(updateMessages( snapshot.docs.map(doc => ({ ...doc.data() }))));
      })
      
  }, [])


  return (
    <div className="App">
      <h1>Facebook messenger react clone</h1>
      <MessageList messages={messages} />
    </div>
  );
}

export default App;
