import React, { useState } from 'react'
import './style.css'
import Add from '../images/Add.png'
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth,db,storage} from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom'
const Register = () => {
  const [err,setErr] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      
  
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, if needed
        },
        (error) => {
          // Handle errors
          setErr(true);
          console.error(error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
  
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"userChats",res.user.uid),{});
              navigate('/')
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className ='formContainer'>
      <div className='FormWrapper'>
        <span className='Mahima'>Mahima's Chat</span>
        <span className='title'>Register</span> 
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='display name' className='name'/>
          <input type='email' placeholder='email' className='email' />
          <input type='password' placeholder='password' className='password' />
          <input type= 'file' style={{display:"none"}} placeholder='file' id="file" className='file' />
          <label htmlFor='file'>
            <img src={Add} className='add'></img>
            <span>Add an Avatar</span>
          </label>
          <button className='signUp'>Sign Up</button>
          {err && <span> ops </span>}
        </form>
        <p>Have an Account already?<Link to = "/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
