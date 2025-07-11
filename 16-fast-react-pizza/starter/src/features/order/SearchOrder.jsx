import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery("")
  }
   
  return (  
    <form onSubmit={handleSubmit}>
      <input className="px-4 py-2 text-sm transition-all duration-300 bg-yellow-100 rounded-full placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50" placeholder="Enter your order number" onChange={(e)=>setQuery(e.target.value)}  />
    </form>
  );
}

export default SearchOrder;