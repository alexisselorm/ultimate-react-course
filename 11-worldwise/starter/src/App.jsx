import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import City from './components/City'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'


export default function App(){

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      
      async function getCities() {
        try {
          setLoading(true)
          const res = await fetch('http://localhost:9000/cities')
          const data = await res.json()
          setCities(data)
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false);
        }
      }
  
      getCities();
  
    }, []);

  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='product' element={<Product/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='app' element={<AppLayout/>}>
        <Route index element={<Navigate replace to="cities"/>}/>
        <Route path='cities' element={<CityList cities={cities} isLoading={loading} />} />
        <Route path='cities/:id' element={<City/>}/>
        <Route path='countries' element={<CountryList cities={cities} isLoading={loading} />} />
        <Route path='form' element={<Form/>} />
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes> 
      </BrowserRouter>

  )
}