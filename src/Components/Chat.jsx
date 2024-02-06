import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";

// ... (imports remain the same)

const Chats = () => {
  const [chats, setChats] = useState({}); // Initialize with an empty object

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Use doc.data() or an empty object if it's falsy
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chat">
      {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          {chat[1].userInfo && (
            <img src={chat[1].userInfo.photoURL} alt="" className="Jane" />
          )}
          <div className="userChatInfo">
            {chat[1].userInfo && (
              <span>{chat[1].userInfo.displayName}</span>
            )}
            <p className="recentText">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
