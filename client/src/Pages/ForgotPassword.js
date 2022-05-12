import React from 'react'
import forgotImg from '../assets/forgot.jpeg'
import Input from '../components/Input'
import  { Link } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'

const ForgotPassword = () => {
  return (
    <section id="forgot">
     <div className='container-forgot'>
      <img src={forgotImg} alt="forgot"/>
       <div className='forgot-info'>
           <h1>Forgot password</h1>
           <form>
           <Input label="Email" type="email" placeholder="Email" />
           <SubmitButton content="Recover password" />
           </form>
           <Link id="link" to="/login">Login</Link>
       </div>
     
     </div> 
    </section>
  )
}

export default ForgotPassword