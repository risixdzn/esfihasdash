import React from 'react'
import './skeleton.css'

function Skeleton(props) {
  return (
    <span className='skeletontext' style={{width:props.width, height:props.height}}></span>
  )
}

export default Skeleton