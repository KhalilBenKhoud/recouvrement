import React from 'react'
import './index.css';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import NotFound from './Pages/notFound'
import Ressources from './Pages/Ressources'
import logo from './assets/logo.png'
import menu from './assets/menu.png'
import close from './assets/close.png'
import Profile from './components/Profile'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  
  const { isAuthenticated } = useAuth0()
  const [nav,setNav] = React.useState(false)
  
  function toggle() {
    setNav(prev => !prev)
  }
  
  
  return (
    <div className="App">
     <nav>
       <div className='wrapper'>
       <img src={logo} alt="logo" className='logo'/>
       </div>
      { !isAuthenticated && <h1>Recouvrement digital</h1> }
       <Profile />
       <img src={nav ? close : menu} alt="menu" className='menu' onClick={toggle}/>
     </nav>
     <BrowserRouter>
      { nav && <div className='sideBar'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/ressources">Ressources</Link>  
    </div> }

     <Routes>
      <Route path="/" element = {<Home />}  />
      <Route path="/about" element = {<About />}  />
      <Route path="/ressources" element = {<Ressources />}  />
      <Route path="/*" element = {<NotFound />}  />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
