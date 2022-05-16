import React from 'react'

const SubmitButton = (props) => {
  return (
    <button className='submitButton' onClick={props.callback}>
        {props.content}
    </button>
  )
}

export default SubmitButton