import React, { useState, useEffect } from "react";
import { getCalc } from "./helpers/rapidApiFetch";
import Loading from "./helpers/Loading";

const LovePage = () => {
  const [calc, setCalc] = useState(); //data fra api - quote-tekst
  const [name1, setName1] = useState();
  const [name2, setName2] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //State til at toggle mellem true/false = component re-render
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    setLoading(true);
    setCalc();

    getCalc(name1, name2)
      .then((dataCalc) => {
        if (dataCalc) {
          //Der er data = OK
          setCalc(dataCalc);
          setError(false);
        } else {
          //ingen data/null = "Error"
          console.log("Error");
          setError(true);
          setCalc(); //hvis der er Error - fjern (gammel) quote-tekst fra state
        }
      })
      .finally(() => {
        //apikald afsluttet = afslut loading
        setLoading(false);
      });
  }, [update]);

  return (
    <section>
      <div>
        <h1>Calculate your love</h1>
        {calc && (
          <div>
            <h2>{calc.fname + " and " + calc.sname + " have"}</h2>
            <h3>{calc.percentage + "% compatibility"}</h3>
            <h4>{calc.result}</h4>
          </div>
        )}
        {loading && <Loading />}
        <input onChange={(e) => setName1(e.target.value)}/>
        <input onChange={(e) => setName2(e.target.value)}/>
        <button
          className="newButton"
          onClick={() => {
            setUpdate(!update);
          }}
        >
          Test names
        </button>
      </div>
    </section>
  );
};

export default LovePage;
