import React from 'react'
import Statistic from '../components/Statistic'
import dashIcon1 from '../assets/dashboard1.png'
import dashIcon2 from '../assets/dashboard2.png'
import dashIcon3 from '../assets/dashboard3.png'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const Dashboard = () => {
  return (
    <section id="dashboard">
     <div className='stat-container'>
     <Statistic image={dashIcon1} title="Objet de la créance"  content="contentieux" />
     <Statistic image={dashIcon2} title="Montant de la créance"  content="125dt" />
     <Statistic image={dashIcon3} title="Actel"  content="Gabes sud" />
     </div>
     <div className='service-container' >
    <div className='payment'>
    <h1>Les dates mentionnées</h1>
    <Input label="Date de facturation" type="date" placeholder="" />
    <Input label="Délai de créance" type="date" placeholder="" />
    <SubmitButton content="extraire les tranches" />
    </div>   
    <div className='dates'>
      <h1>Payement</h1>
    <Input label="Montant de la créance" type="number" placeholder="" />
    <Input label="Taux d'intérêt" type="number" placeholder="" />
    <SubmitButton content="calculer la somme" />
    </div>
    </div>
    </section>
  )
}

export default Dashboard