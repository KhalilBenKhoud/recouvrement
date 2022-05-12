import React from 'react'

const Statistic = (props) => {
  return (
    <div className='stat-box'>
        <img   src= {props.image} alt="icon" />
        <div>
        <p>{props.title}</p>
        <h1>{props.content}</h1>
        </div>
    </div>
  )
}

export default Statistic