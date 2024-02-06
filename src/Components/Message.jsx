import React, { useContext,useRef } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext) 
  const ref = useRef()
  // console.log(message)
  // console.log(data.user.photoURL)
  return (
    <div 
    ref = {ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
      <img src={message.senderId === currentUser.uid ? currentUser.photoURL :  data.user.photoURL} alt="" className='photoMessage1' />
        <span className='justNowMessage'>Just Now</span>
      </div>
      <div className="messageContent">
        <p className='pMessage'>{message.text}</p>
        {message.img &&<img src={message.img} className='photoMessage2' />}
      </div>
    </div>
  )
}

export default Message

