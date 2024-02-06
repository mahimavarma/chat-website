import React, { useState,useContext } from 'react'
import Append from '../images/Append.png'
import attach from '../images/attach.png'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import {v4 as uuid} from "uuid"
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
const Input = () => {
  const [text,setText] = useState("")
  const [img,setImg] = useState(null)
  const [err,setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext) 
  const handleSend = async() =>{
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // Handle errors
          // setErr(true);
          // console.error(error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.ChatID),{
              messages:arrayUnion({
                id:uuid(),
                text,
                senderId: currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              }),
            });
          });
        }
      );
      
    }else{
      await updateDoc(doc(db,"chats",data.ChatID),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
        })
      })
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.ChatID + ".lastMessage"]:{
        text 
      }, 
      [data.ChatID + ".date"]:serverTimestamp(),
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.ChatID + ".lastMessage"]:{
        text 
      }, 
      [data.ChatID + ".date"]:serverTimestamp(),
    });;
    setText("")
    setImg(null)
  }
  return (
    <div className='input'> 
      <input type='text' placeholder='Type something ..' className='inputInput' onChange={e=>setText(e.target.value)}value = {text}  />
      <div className="send">
        <img src={Append} alt="" className='append'/>
       
        <input type='file'  placeholder='files' style={{display:"none"}}  id='files' onChange={e=>setImg(e.target.files[0])}   />
        <label htmlFor='files'>
          <img src={attach} alt=""  className='attach' />
        </label>
      </div>
      <button className='buttonSend' onClick={handleSend}>send</button>
    </div>
   
  )
}

export default Input
