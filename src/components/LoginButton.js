
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  
     const { loginWithRedirect, isAuthenticated } = useAuth0()
  
  
    return (
    !isAuthenticated  &&
     <button  className="btn" 
     onClick={ async () => await loginWithRedirect()}>Sign in</button> 
  )
}
export default LoginButton