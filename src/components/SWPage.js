import React, { useState, useEffect } from "react";

import Person from "./helpers/Person";

import Loading from "./helpers/Loading";
import { getSW } from "./helpers/Swapi";
const SWPage = () => {
  const [SW, setSW] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [update, setUpdate] = useState(true);
  //   state for page number
  const [Page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);

    getSW(Page)
      .then((data) => {
        if (data) {
          console.log(data);
          setSW(data);
          setError(false);
        } else {
          console.log("Error");
          setError(true);
          setSW();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [Page]);
  return (
    <section id="SWPage" className="subContainer">
      <div>
        <h1>People of Star Wars</h1>
        {SW && (
          <div>
            {SW.results
              //   .filter((p) => {
              //   filter works as if statement for map
              // return p.height < "240"
              //   })
              .map((p, i) => (
                <Person p={p} key={i} />
              ))}
            <button
              disabled={SW.previous ? false : true}
              onClick={() => setPage(Page - 1)}
            >
              &lt;&lt; Previous
            </button>
            <button
              disabled={SW.next ? false : true}
              onClick={() => setPage(Page + 1)}
            >
              Next &gt;&gt;
            </button>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </section>
  );
};

export default SWPage;
