import React, { useState, useEffect } from "react";

import Loading from "./helpers/Loading";
import { getFact } from "./helpers/rapidApiFetch";

function FactsPage() {
  const [fact, setFact] = useState(); //data fra api - fact-tekst
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //State til at toggle mellem true/false = component re-render
  const [update, setUpdate] = useState(true);

  //KALD api/webservice når "react" er klar
  useEffect(() => {
    setLoading(true);

    getFact()
      .then((data) => {
        if (data) {
          //Der er data = OK
          console.log(data);
          setFact(data); //put den fact/faktatekst som api'et sender - i state
          setError(false); //hvis der er data - er der ingen Error = false
        } else {
          //ingen data/null = "Error"
          console.log("Error");
          setError(true);
          setFact(); //hvis der er Error - fjern (gammel) fact-tekst fra state
        }
      })
      .finally(() => {
        //apikald afsluttet = afslut loading
        setLoading(false);
      });
  }, [update]);

  return (
    <section id="factsPage" className="subContainer">
      <div>
        <h1>Random fact</h1>

        {
          //hvis det er data - altså er fact i state
          fact && <h2>{fact[0].fact}</h2>
        }

        {loading && <Loading/>}

        <button
          className="newButton"
          onClick={() => {
            setUpdate(!update);
          }}
        >
          New fact
        </button>
      </div>
    </section>
  );
}
export default FactsPage;