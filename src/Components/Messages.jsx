import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages,setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect (() =>{
    const unsub = onSnapshot(doc(db,"chats",data.ChatID),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return () =>{
      unsub()
    }
  },[data.ChatID])
  // console.log(messages)
  return (
    <div className="messages">
     {messages.map((m) => (
        <Message message={m} key={m.id} />
        ))}
    </div>
  );
};

export default Messages;