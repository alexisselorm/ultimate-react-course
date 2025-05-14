import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [amount, setAmount] = useState(10);
  const [converted, setConverted] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    async function getConversion() {
      setisLoading(true)
      const url =`http://localhost:3000/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      const res = await fetch(url)
      const data = await res.json();
      setConverted(()=> (data.rates[toCurrency] * amount).toFixed(2))
    }

    if (fromCurrency === toCurrency) {
      return setConverted(amount)
    }
    getConversion()
    setisLoading(false);
  }, [amount,fromCurrency,toCurrency]);

  return (
    <>
    <div>
      <input type="text" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <select disabled={isLoading} value={fromCurrency} onChange={e=>setFromCurrency(e.target.value)} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="ZAR">ZAR</option>
      </select>
      <select  value={toCurrency} onChange={e=>setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="ZAR">ZAR</option>
      </select>

      <p>Output: {converted}</p>
    </div>
     </>
  )
}

export default App
