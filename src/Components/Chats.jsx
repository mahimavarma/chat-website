import React, { useContext, useEffect, useState } from 'react'
import Cam from '../images/Cam.png'
import Add from '../images/Add.png'
import more from '../images/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../Context/ChatContext'
const Chats = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src = {Cam} className="features" />
          <img src={Add} className="features" />
          <img src={more} className="features" />
        </div>
      </div>
    <Messages />
    <Input />
    </div>
  )
}

export default Chats
