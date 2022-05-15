import React, { useState, useEffect } from "react";

import Loading from "./helpers/Loading";
import { getSong } from "./helpers/rapidApiFetch";
const GeniusPage = () => {
  const [song, setSong] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    setLoading(true);

    getSong()
      .then((data) => {
        if (data) {
          console.log(data);
          setSong(data);
          setError(false);
        } else {
          console.log("Error");
          setError(true);
          setSong();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [update]);
  return (
    <section id="GeniusPage" className="subContainer">
      <div>
        <h1>List of Artists</h1>
        {song && song.response.songs.map((s, i) => <h2 key={i}>{s.artist_names}</h2>)}
        {loading && <Loading />}
      </div>
    </section>
  );
};

export default GeniusPage;
