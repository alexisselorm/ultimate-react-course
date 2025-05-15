import { useEffect, useState } from "react";



export default function useMovies(query,callback){
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
  
   useEffect(() => {
    const controller =  new AbortController();

    async function fetchMovies() {
  try {
        setIsLoading(true);
        setError("");
      const res = await fetch(`https://www.omdbapi.com/?apikey=485e5acb&s=${query}`,{signal:controller.signal})
  
      if (!res.ok) {
        throw new Error("Something went wrong");
        
      }
      const data = await res.json()
      if (data.Response==='False') {
        throw new Error("Movie not found");
        
      }
  
      setMovies(()=>data.Search)
  } catch (error) {
    setError(()=>error.message)
  } finally{
    setIsLoading(false)
  }
    }

    if (query.length<3) {
      setMovies([])
      setError("")
      return;
    }

    // handleCloseMovie();
    fetchMovies();
    setIsLoading(false)

    return function(){
      controller.abort();
    }
  }, [query]);


  return {movies,isLoading,error}

}