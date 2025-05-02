import { useState } from 'react'

import './App.css'





function App() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const date = new Date()
  date.setDate(date.getDate()+count)

  function handleReset(){
    setStep(1)
    setCount(0)
  }


  return (
    <>
      <div>
      <input type='range' max="10" min="0" value={step} onChange={(e)=>setStep(+e.target.value)}/><span>{step}</span>
      </div>
      <div>
      <button onClick={()=>setCount((s)=>s-step)}>-</button>
      <input type='text' value={count} onChange={ (e)=>setCount(+e.target.value)}/>
      <button onClick={()=>setCount((s)=>s+step)}>+</button>
      </div>
      <p>{ count ==0 ? "Today is" 
      : count > 0 ? `${count} days from today is `:
       `${Math.abs(count)} days ago was`}</p>
       <p>{date.toDateString()}</p>
       {
        (count > 0 || step >1) && <button onClick={handleReset}>Reset</button>
       }
       
    </>
  )
}


export default App
