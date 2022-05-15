
import React, { useState, useEffect } from "react";

import Loading from "./helpers/Loading";
import { getQuote } from "./helpers/rapidApiFetch";

const QuotePage = () => {
  const [quote, setQuote] = useState(); //data fra api - quote-tekst
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //State til at toggle mellem true/false = component re-render
  const [update, setUpdate] = useState(true);

  //KALD api/webservice når "react" er klar
  useEffect(() => {
    setLoading(true);

    getQuote(lang)
      .then((dataQuote) => {
        if (dataQuote) {
          //Der er data = OK
          setQuote(dataQuote);
          setError(false);
        } else {
          //ingen data/null = "Error"
          console.log("Error");
          setError(true);
          setQuote(); //hvis der er Error - fjern (gammel) quote-tekst fra state
        }
      })
      .finally(() => {
        //apikald afsluttet = afslut loading
        setLoading(false);
      });
  }, [update, lang]);

  return (
    <section id="QuotePage" className="subContainer">
      <div>
        <h4>Random Quote</h4>
        {/* hvis det er data - altså en quote i state */}
        {quote && (
          <div>
            <h2>&#10077;{quote.content}&#10078;</h2>
            <h3>{quote.originator.name}</h3>{" "}
          </div>
        )}
        {loading && <Loading />}
        {/* !update reverses the boolean value, false to true or vice versa */}
        <label>
          Choose a Language
          <select
            name="Lang"
            id="languages"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese</option>
            <option value="fr">French</option>
            <option value="cs">Czech</option>
            <option value="sk">Slovak</option>
            <option value="ru">Russian</option>
            <option value="pl">Polish</option>
          </select>
        </label>
        <button
          className="newButton"
          onClick={() => {
            setUpdate(!update);
          }}
        >
          New Quote
        </button>
      </div>
    </section>
  );
};

export default QuotePage;
