import React from 'react'
import Accordion from '../components/Accordion'
import { accordionData } from '../assets/content'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'


const Home = () => {
  
   const {isLoading , error } = useAuth0()

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
     {error && <p>Authentication error</p>}
     {!error && isLoading && <p>Loading ...</p>}
     {!error && !isLoading && (
     <>
     <LoginButton />
     <LogoutButton />
     
     </>
     )}
    
     </section>
  )
}

export default Home