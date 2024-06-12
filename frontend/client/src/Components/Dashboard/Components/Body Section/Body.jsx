import React from 'react'
import './body.css'
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'

const Body = ({ selectedItem }) => {
  return (
    <div className='mainContent'>
      <Top/>

      <div className='listing'>
      <Listing selectedItem={selectedItem}/>
      </div>
    </div>
  )
}

export default Body