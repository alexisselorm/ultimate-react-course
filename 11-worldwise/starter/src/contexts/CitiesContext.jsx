import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const CitiesContext = createContext()

function CitiesProvider({children}){

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity,setCurrentCity]=useState({})

    useEffect(() => {
      
      async function getCities() {
        try {
          setIsLoading(true)
          const res = await fetch('http://localhost:9000/cities')
          const data = await res.json()
          setCities(data)
        } catch (error) {
          console.log(error);
        } finally{
          setIsLoading(false);
        }
      }
  
      getCities();
  
    }, []);

    async function getCity(id) {
        try {
          setIsLoading(true)
          const res = await fetch(`http://localhost:9000/cities/${id}`)
          const data = await res.json()
          setCurrentCity(data)
        } catch (error) {
          console.log(error);
        } finally{
          setIsLoading(false);
        }
      }

    return (
      <CitiesContext.Provider value={
        {
          cities,
          isLoading,
          getCity,
          currentCity
        }
      }>
        {children}
      </CitiesContext.Provider>
    )


}

function useCities(){
  const context = useContext(CitiesContext);
  if (context===undefined) {
    throw new Error("Cities Context was used outside the cities provider");
    
  }
  return context;
};

export {CitiesProvider,useCities}