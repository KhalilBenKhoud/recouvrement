import {useState} from 'react'
import Statistic from '../components/Statistic'
import dashIcon1 from '../assets/dashboard1.png'
import dashIcon2 from '../assets/dashboard2.png'
import dashIcon3 from '../assets/dashboard3.png'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const Dashboard = () => {
   const [montant,setMontant] = useState(0)
   const [interet,setInteret] = useState(0)
   
  return (
    <section id="dashboard">
     <div className='stat-container'>
     <Statistic image={dashIcon1} title="Objet de la créance"  content="contentieux" />
     <Statistic image={dashIcon2} title="Montant de la créance"  content="125dt" />
     <Statistic image={dashIcon3} title="Actel"  content="Gabes sud" />
     </div>
     <div className='service-container' >
    <div className='dates'>
    <h1>Les dates mentionnées</h1>
     <label>Date de facturation</label>
    <input id="in"  type="date" placeholder="" />
     <label>Délai de créance</label>
    <input id="in" type="date" placeholder="" />
    <SubmitButton content="extraire les tranches" />
    </div>   
    <div className='payment'>
      <h1>Payement</h1>
    <span>Montant de la créance</span>
    <input id="in"  type="number" placeholder="" 
     onChange = { (e) => {
      setMontant(e.target.value)
      console.log(e.target.value)
     }    
     }
    />
    <span>Taux d'intérêt %</span>
    <input id="in" type="number" placeholder=""
     onChange= { (e) => {
        setInteret(e.target.value)
     }
     } />
    <SubmitButton content="calculer la somme" />
     <h1> { Number(montant) + ((Number(montant) * Number(interet))/100) } dt</h1>
    </div>
    </div>
    </section>
  )
}

export default Dashboard