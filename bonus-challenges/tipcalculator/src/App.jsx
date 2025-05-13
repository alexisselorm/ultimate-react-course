import { useState } from 'react'
import './App.css'
import Bill from './Bill';
import Service from './Service';
import FriendService from './FriendService';
import Total from './Total';
import Reset from './Reset';

function App() {
  const [bill, setBill] = useState(0)
  const [service, setService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  function handleReset(){
    setBill(0);
    setService(0)
    setFriendService(0)
  }

  return (
    <>
    <Bill bill={bill} setBill={setBill} />
   <Service service={service} setService={setService} />
    <FriendService friendService={friendService} setFriendService={setFriendService} />
    <Total bill={bill} service={service} friendService={friendService} />
    {bill && <Reset onReset={handleReset} />}
    </>
  )
}

export default App
