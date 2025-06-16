// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner";
import useURLposition from "../hooks/useURLposition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat,lng]= useURLposition();
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");
  const {createCity,isLoading}= useCities();
  const navigate = useNavigate()
  


  useEffect(() => {
    if (!lat || !lng) return;
    
    async function fetchCity() {

      try {
        setIsLoadingGeocode(true);
        setGeoCodeError("");
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error("No city data found for the provided coordinates. Click somewhere else");
        }

        setCityName(data.city || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
      } catch (error) {
        console.error("Error fetching city data:", error);
        setGeoCodeError(error.message)
      } finally {
        setIsLoadingGeocode(false);
      }
    }

    fetchCity();


  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !country || !date || !notes) {
      return alert("Please fill in all fields");
    }

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
      emoji,
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocode) {
    return <Spinner/>
  }

  if( !lat || !lng) {
    return <Message message="Click on the map to add a new city" />;
  }
  if (geoCodeError) {
    return <Message message={geoCodeError} />;
  }

  return (
    <form className={`${styles.form} ${isLoading? styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" onChange={date=>setDate(date)} selected={date} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>


      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
