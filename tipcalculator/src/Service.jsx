export default function Service({service,setService}){
 return (
  <>
  <br/>
  <span>How did you like the service?</span>
  <select type="text" value={service} onChange={(e)=>setService(e.target.value)}>
    {Array.from({length:10},(v,i)=> <option value={i/10}>{i*10}%</option>)}
  </select>
  </>
 ) 
}