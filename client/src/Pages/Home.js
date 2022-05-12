import React from 'react'
import Accordion from "../components/Accordion"
import accordionData from "../assets/content"

const Home = () => {
  return (
    <section id="home">
      <h1>Renseignements : </h1>
     <div className='accordion'>
     { 
       accordionData.map( ({title , content}) => (
        <Accordion title={title} content={content} />
       ))
     }
     </div>

    </section>
  )
}

export default Home