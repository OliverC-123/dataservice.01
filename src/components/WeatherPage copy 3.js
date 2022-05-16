import React, { useState, useEffect, useRef } from "react";

import Loading from "./helpers/Loading";
import { getWeather, getWeatherLatLon } from "./helpers/Weatherapi";
import { getGeo, delMap } from "./helpers/Leafletapi";
const WeatherPage3 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(true);

  // chosen zip
  const [map, setMap] = useState();
  const [weather, setWeather] = useState();
  const [mapdata, setMapData] = useState({ lat: 56, lng: 10 });
  // list of zip
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
        console.log(position);
        setWeather(data);
        setMap(data);
        setError(false);
        setLoading(false);
        getGeo([position.coords.latitude, position.coords.longitude]);
      } else {
        console.log("Error");
        setError(true);
      }
    });
  }
  // useEffect for getGeo
  useEffect(() => {
    GetLocation();
    return () => {
      delMap();
    };
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
        let weatherData = await getWeatherLatLon(mapdata.lat, mapdata.lng);
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
      delMap();
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
