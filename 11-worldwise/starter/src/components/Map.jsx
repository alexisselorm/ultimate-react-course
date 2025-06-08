import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import { useState } from 'react';


function Map() {
  
  const [searchParams,setSearchParams]=useSearchParams();
  const {mapPosition, setMapPosition}=useState([40,0])
  const lat=searchParams.get("lat")
  const lng=searchParams.get("lng")

  const navigate = useNavigate();




  return ( 
  <div className={styles.mapContainer}>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  </div> );
}

export default Map;