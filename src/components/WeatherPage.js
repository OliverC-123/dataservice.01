import React, { useState, useEffect, useRef } from "react";

import News from "./helpers/News";
import Loading from "./helpers/Loading";
import { getWeather, getWeatherLatLon } from "./helpers/Weatherapi";

const WeatherPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(true);

  const [zip, setZip] = useState();
  const [weather, setWeather] = useState();

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

  useEffect(() => {
    GetLocation();
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    setLoading(true);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    getWeather(zip)
      .then((data) => {
        console.log(data);
        setWeather(data);
        setError(false);
      })
      .catch((err) => {
        console.log("An error has occurred");
        setError(true);
        setWeather();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [update]);

  function timeTranslate(time) {
    return new Date(time * 1000).toLocaleTimeString(
      [],
      ("da-DK", { hour: "2-digit", minute: "2-digit" })
    );
  }
  return (
    <section id="Page" className="">
      <div>
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
        <input
          onKeyDown={(e) => (e.key === "Enter" ? setUpdate(!update) : null)}
          id="searchInput"
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip Code"
        />
        <button id="" onClick={() => setUpdate(!update)}>
          Søg
        </button>
      </div>
    </section>
  );
};

export default WeatherPage;
