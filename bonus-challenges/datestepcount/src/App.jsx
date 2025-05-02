import { useState } from 'react'

import './App.css'





function App() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const date = new Date()
  date.setDate(date.getDate()+count)


  return (
    <>
      <div>
      <button onClick={()=>setStep((s)=>s-1)}>-</button>
      <p>Step: {step}</p>
      <button onClick={()=>setStep((s)=>s+1)}>+</button>
      </div>
      <div>
      <button onClick={()=>setCount((s)=>s-step)}>-</button>
      <p>Count: {count}</p>
      <button onClick={()=>setCount((s)=>s+step)}>+</button>
      </div>
      <p>{ count ==0 ? "Today is" 
      : count > 0 ? `${count} days from today is `:
       `${Math.abs(count)} days ago was`}</p>
       <p>{date.toDateString()}</p>
    </>
  )
}

// function Step(){


//   return (
//     <div>
  
//     </div>
//   )
// }

// function Count(){

//   return (
//     <div>
      
//     </div>
//   )
// }


export default App
