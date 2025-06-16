import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents} from 'react-leaflet';
import { useEffect, useState } from 'react';
import {useCities} from '../contexts/CitiesContext';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';



function Map() {
  
  const {cities} = useCities();


  
  const [searchParams]=useSearchParams();
  const [mapPosition, setMapPosition]=useState([51.505, -0.09])
  const mapLat=searchParams.get("lat")
  const mapLng=searchParams.get("lng")
  const {error,isLoading:isLoadingPosition,position:geolocationPosition,getPosition} = useGeolocation();


  useEffect(() => {
    if(mapLat && mapLng) {
      setMapPosition([mapLat || 40, mapLng || 0])
    };
  }, [mapLat, mapLng]);

  useEffect(() => {
    if(geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);


  return ( 
  <div className={styles.mapContainer}>
   {!geolocationPosition && <Button onClick={getPosition} type="position">
      {isLoadingPosition ? 'Loading position...' : 'Get my position'}
    </Button>}
    <MapContainer className={styles.map} center={[40,0]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  {
   cities.map(city=>(
   <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
    <Popup>
      <span>{city.emoji}</span><span>{city.cityName}</span>
    </Popup>
  </Marker>
))}
 <ChangeCenter position={mapPosition} />
 <DetectClick />
</MapContainer>
  </div> 
  );
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click:e=> navigate('form?lat='+e.latlng.lat+'&lng='+e.latlng.lng)
  })
}


export default Map;