import {useState} from 'react'
import SubmitButton from '../components/SubmitButton'

const Requests = () => {
    
    const [requests,setRequests] = useState([]) 
    const [text,setText] = useState("")
    const [object,setObject] = useState("")
    return (
    <section id="requests">
    <label htmlFor="objet">Objet :</label>
    <input type="text" id="objet" onChange={
       (e) => {
        setObject(e.target.value)
        console.log(object);
    }  
    }/>
     <label htmlFor="plainte"> Contenu : </label>
     <span>
     <textarea id="plainte" rows="10" cols="50" onChange={
         (e) => {
             setText(e.target.value)
             console.log(text);
         }
     }/>
     </span>
     <SubmitButton content="Déposer une plainte" callback={ (e) => {
         e.preventDefault()
         setRequests([...requests, {title:object , content:text} ])
        
          } }
         /> 

     <div className='plaintes'>
     <h1>Anciennes plaintes :</h1>
      {
        requests.map(n => <div className='old-request'>
            <h1 className='request-title'>{n.title}</h1> <br/>
            {n.content}</div>)
      
      } 
     </div>
    </section>
  )
}

export default Requests