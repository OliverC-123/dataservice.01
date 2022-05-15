import React from "react";

const News = ({ n }) => {
  return (
    <div>
      <div id="News">
        <h1>{n.title}</h1>
        <img src={n.urlToImage}></img>
        <p>{n.description}</p>
        <h3>{n.author}</h3>
        <p>
          Published &nbsp;
          {new Date(n.publishedAt).toLocaleString("da-DK", {
            weekday: "long",
            month: "short",
            year: "numeric",
          })}
          kl. &nbsp;
          {new Date(n.publishedAt).toLocaleString("da-DK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default News;
