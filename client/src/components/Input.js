import React from 'react'

const Input = (props) => {
  return (
    <div>
       <label htmlFor='in'>{props.label}</label> <br />
       <input 
         id='in'
         type = {props.type}
         placeholder = {props.placeholder}
         required
       />
    </div>
  )
}

export default Input