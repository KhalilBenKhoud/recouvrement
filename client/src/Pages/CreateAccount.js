import React from 'react'
import createImg from "../assets/create-account.jpeg"
import Input from '../components/Input'
import github from '../assets/github.png'
import twitter from '../assets/twitter.png'
import  { Link } from 'react-router-dom'
import SocialButton from '../components/SocialButton'
import SubmitButton from '../components/SubmitButton'

const CreateAccount = () => {
  return (
    <section id="create">
      <div className="container-create">
      <img src= {createImg} alt="create" />
      <div className='create-info'>
        <h1>Create account</h1>
        <form>
        <Input label="CIN" type="text" placeholder="CIN" />
        <Input label="Email" type="email" placeholder="Email" />
        <Input label="Password" type="password" placeholder="password" />
        <Input label="Confirm password" type="password" placeholder="password" />
        <div>
        <input type="checkbox" id="check" required />
        <label for="check">  I agree to the privacy policy</label>
        </div>
        <SubmitButton content="Create account" />
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
           
          <Link id="link" to="/login">Already have an account? Login</Link>
      </div> 
      </div>
     </section>
  )
}

export default CreateAccount