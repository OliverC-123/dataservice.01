import React, { useState, useEffect, useRef } from "react";

import Loading from "./helpers/Loading";
import { getWeatherLatLon } from "./helpers/Weatherapi";
import { getGeo2 } from "./helpers/Leafletapi";
const WeatherPage3 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(true);

  // chosen zip
  const [weather, setWeather] = useState();
  const [mapdata, setMapdata] = useState({ lat: 56, lng: 10 });

  // function to translate sunrise/sunset
  function timeTranslate(time) {
    return new Date(time * 1000).toLocaleTimeString(
      [],
      ( { hour: "2-digit", minute: "2-digit" })
    );
  }
  useEffect(() => {
    getGeo2(setMapdata);
  }, []);
  useEffect(() => {
    // normal function async function {name}(){code here} later call name to run code
    // iife  (async()=>{code here})() runs code immidiately
    (async () => {
      setLoading(true);
      try {
        let weatherData = await getWeatherLatLon({
          latitude: mapdata.lat,
          longitude: mapdata.lng,
        });
        setWeather(weatherData);
        setError();
      } catch (err) {
        console.log(err);
        setError(true);
        setWeather();
      } finally {
        setLoading(false);
      }
    })();
    // clean up function for removing map after changing route with router
    return () => {
      // delMap();
    };
  }, [update, mapdata]);

  return (
    <section id="Page" className="">
      <div>
        <h1>Very weather with a map</h1>
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
      {/* {error && <Error/>} */}
      <div
        id="mapdiv"
        style={{ height: 400, width: "auto", backgroundColor: "silver" }}
      ></div>
    </section>
  );
};

export default WeatherPage3;
