export default function FriendService({friendService,setFriendService}) {
  return (
    <>
    <br/>
    <span>How did your friend like the service?</span>
    <select type="text" value={friendService} onChange={(e)=>setFriendService(e.target.value)}>
      {Array.from({length:10},(v,i)=> <option value={i/10}>{i*10}%</option>)}
    </select></>
  )
  
}