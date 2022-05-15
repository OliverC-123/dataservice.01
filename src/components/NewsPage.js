import React, { useState, useEffect } from "react";

import News from "./helpers/News";
import Loading from "./helpers/Loading";
import { getNews } from "./helpers/Newsapi";

const NewsPage = () => {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [lang, setLang] = useState("en");
  const [search, setSearch] = useState("Ukraine");
  const [param, setParam] = useState("everything");

  const [update, setUpdate] = useState(true);
  useEffect(() => {
    setLoading(true);

    getNews(search, lang, param)
      .then((data) => {
        if (data) {
          console.log(data);
          setNews(data);
          setError(false);
        } else {
          console.log("Error");
          setError(true);
          setNews();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [update, lang, param]);
  return (
    <section id="Page" className="">
      <div>
        <div id="searchContainer">
          <h1>big news very important</h1>
          <select
            name="Parameter"
            id="Parameters"
            onChange={(e) => setParam(e.target.value)}
          >
            <option value="everything">Everything</option>
            <option value="top-headlines">Top Headlines</option>
          </select>
          <select
            name="Lang"
            id="Languages"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="ua">Ukraine</option>
          </select>
          <input
            id="searchInput"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          ></input>
          <button
            disabled={!setSearch ? true : false}
            id="searchButton"
            onClick={() => {
              setUpdate(!update);
            }}
          >
            Search
          </button>
        </div>
        {news && (
          <div>
            {news.articles.map((n, i) => (
              <News n={n} key={i} />
            ))}
          </div>
        )}

        {loading && <Loading />}
      </div>
    </section>
  );
};

export default NewsPage;
