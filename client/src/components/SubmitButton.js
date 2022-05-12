import React from 'react'

const SubmitButton = (props) => {
  return (
    <button className='submitButton'>
        {props.content}
    </button>
  )
}

export default SubmitButton