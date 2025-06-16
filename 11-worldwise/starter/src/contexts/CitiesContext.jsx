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

    async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:9000/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCity)
        }
      )
      const data = await res.json()

      setCities(prevCities => [...prevCities, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  }

   async function deleteCity(id) {
    try {
      setIsLoading(true)
       await fetch(`http://localhost:9000/cities/${id}`,
        {
          method: 'DELETE',
          
        }
      )
  
      setCities(cities => cities.filter(city => city.id !== id));

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
          createCity,
          deleteCity,
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