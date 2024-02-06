import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chats from '../Components/Chats'
const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar />
            <Chats />
        </div>
    </div>
  )
}

export default Home

