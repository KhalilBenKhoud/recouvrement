import {useState} from 'react'
import SubmitButton from '../components/SubmitButton'

const Requests = () => {
    
    const [requests,setRequests] = useState([]) 
    const [text,setText] = useState("")
    const [object,setObject] = useState("")
    return (
    <section id="requests">
    <h1>Objet :</h1>
    <input type="text" id="objet" onChange={
       (e) => {
        setObject(e.target.value)
        console.log(object);
    }  
    }/>
     <h1> Contenu : </h1>
     <span>
     <textarea id="plainte" rows="10" cols="50" onChange={
         (e) => {
             setText(e.target.value)
             console.log(text);
         }
     }/>
     </span>
     <SubmitButton content="Déposer une plainte" onClick={ (e) => {
         e.preventDefault()
         setRequests([...requests, {title:object , content:text} ])
        
          } }
         /> 

     <div className='plaintes'>
     <h1>Anciennes plaintes :</h1>
      {
        requests.map(n => <div className='old-request' >
            <h1 className='request-title'>{n.title}</h1> <br/>
            {n.content}</div>)
      
      } 
     </div>
    </section>
  )
}

export default Requests