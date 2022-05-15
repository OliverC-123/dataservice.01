import React, { useState, useEffect, useRef } from "react";

import Loading from "./helpers/Loading";
import { getWeather, getWeatherLatLon } from "./helpers/Weatherapi";
import { getPostal } from "./helpers/Autocompleteapi";

const WeatherPage1 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(true);

  // chosen zip
  const [weather, setWeather] = useState();
  const [zip, setZip] = useState();
  // list of zip
  const [dawapostnr, setDawapostnr] = useState();
  // functions for getGeo
  function GetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  function showPosition(position) {
    getWeatherLatLon(position.coords).then((data) => {
      if (data) {
        console.log(data);
        setWeather(data);
        setError(false);
        setLoading(false);
      } else {
        console.log("Error");
        setError(true);
        setWeather();
      }
    });
  }
  // useEffect for getGeo
  useEffect(() => {
    GetLocation();
  }, []);

  const isInitialMount = useRef(true);

  // function to translate sunrise/sunset
  function timeTranslate(time) {
    return new Date(time * 1000).toLocaleTimeString(
      [],
      ("da-DK", { hour: "2-digit", minute: "2-digit" })
    );
  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // normal function async function {name}(){code here} later call name to run code
    // iife  (async()=>{code here})() runs code immidiately
    (async () => {
      setLoading(true);
      try {
        if (zip.length !== 4 || isNaN(zip)) {
          // user is searching for city/zip
          // gets DAWA data - sends zip code/city name
          let dawaData = await getPostal(zip);
          setDawapostnr(dawaData);
          setError();
        } else {
          // user chosen city/zip
          let weatherData = await getWeather(zip);
          setWeather(weatherData);
          setError();
        }
      } catch (err) {
        setError(true);
        setDawapostnr();
        setWeather();
      } finally {
        setLoading(false);
      }
    })();
  }, [update, zip]);

  return (
    <section id="Page" className="">
      <div>
        <input
          list="zips"
          onChange={(e) => setZip(e.target.value.substring(0, 4))}
          type="text"
          placeholder="Input Zip"
          autoComplete="off"
        />
        <datalist id="zips">
          {dawapostnr &&
            dawapostnr.map((p) => (
              <option value={p.tekst} key={p.postnummer.nr} />
            ))}
        </datalist>
        <div>
          <h1>Very weather</h1>
        </div>
        {weather && (
          <div>
            <h2>Land : &nbsp;{weather.sys.country}</h2>
            <h2>By : &nbsp;{weather.name}</h2>
            <h1>Temp &nbsp;{Math.round(weather.main.temp)}&deg;C</h1>
            <p>
              Sunrise - &nbsp;
              {timeTranslate(weather.sys.sunrise)}
              &nbsp;Sunset - &nbsp;
              {timeTranslate(weather.sys.sunset)}
            </p>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </section>
  );
};

export default WeatherPage1;
