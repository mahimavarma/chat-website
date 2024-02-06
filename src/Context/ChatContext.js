import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    ChatID: "null",
    user: {},
  };

  const ChatReducer = (state, action) => {
    console.log("action.payload.uid:", action.payload.uid);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          ChatID:
                currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);



  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
