
import styles from './CountryList.module.css'
import CountryItem from './CountryItem';
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const {cities,isLoading} = useCities();


  if (isLoading) {
    return <Spinner/>
  }

  if (!cities.length) {
    return <Message message="Add your first city by clicking on a citiy on the map"/>
  }

  const countries=cities.reduce((arr,city)=>{
    if (!arr.map(el=>el.city).includes(city.country)) {
      return [...arr,{country:city.country,emoji:city.emoji}]
    }else{
      return arr
    }
  },[])

  return ( 
    <ul className={styles.countryList}>
      {countries.map(country=><CountryItem  key={country.country} country={country}/>)}
    </ul>
   );
}

export default CountryList;