import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chat from './Chat'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Navbar />
        <Search />
        <Chat />

    </div>
  )
}

export default Sidebar
