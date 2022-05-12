import React from 'react'
import loginImg from '../assets/login-office.jpeg'
import Input from '../components/Input'
import github from '../assets/github.png'
import twitter from '../assets/twitter.png'
import  { Link } from 'react-router-dom'
import SocialButton from '../components/SocialButton'
import SubmitButton from '../components/SubmitButton'

const Login = () => {
  return (
    <section id='login'>
      <div className='container-login'>
      <img src={loginImg} alt='loginImg' />
       <div className='login-info'>
         <h1>Login</h1>
         <form>
          <Input label="CIN" type="text" placeholder="CIN" />
          <Input label="Password" type="password" placeholder="password" />
           <SubmitButton content="Login" />
          </form>
          <hr />
           <SocialButton>
             <img src= {github} alt='github' />
             <p>Github</p>
           </SocialButton>
           <SocialButton>
             <img src= {twitter} alt='github' />
             <p>Twitter</p>
           </SocialButton>
           <Link id="link" to="/forgot">Forgot your password ?</Link>
          <Link id="link" to="/create"> Create account</Link>
       </div>
      </div>
    </section>
  )
}

export default Login