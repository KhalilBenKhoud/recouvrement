import React from 'react'

const Accordion = ({title, content}) => {
  
     const [active, setActive] = React.useState(false)
    return (
    <div className='accordion-item' >
        <div className='accordion-title' onClick={() => setActive(prev => !prev)}>
         <div>{title}</div>
         <div>{active ? '-' : '+'}</div>
        </div>
        {active &&  <div className='accordion-content'>{content}</div> }
    </div>
  )
}

export default Accordion