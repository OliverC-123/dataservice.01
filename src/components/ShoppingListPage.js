import React, { useState, useEffect } from "react";
import errorHandle from "./helpers/errorHandle";
import Loading from "./helpers/Loading";
import "../indkoeb.scss";
import { getGrocery, postGrocery, delGrocery } from "./helpers/Airtableapi";
const ShoppingListPage = () => {
  // useStates
  const [items, setItems] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  // useState to update useEffect
  const [update, setUpdate] = useState(false);
  // useState to post item
  const [post, setPost] = useState();
  // useEffect
  useEffect(() => {
    setItems();
    setLoading(true);

    getGrocery()
      .then((data) => {
        setItems(data);
        setError(false);
      })
      .catch((error) => {
        // An error was made
        console.log("error", error);
        setError(true);
        setItems();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [update]);

  // handlePost posts items to AirTable list
  const handlePost = (e) => {
    // prevents site from default reloading on submit
    e.preventDefault();
    setLoading(true);
    // posts an item to shopping list
    const postItem = {
      records: [
        {
          fields: {
            vare: post,
          },
        },
      ],
    };
    // call POST to api
    postGrocery(postItem)
      .then((data) => {
        console.log(data);
        setError();
        setUpdate(!update);
      })
      .catch((err) => {
        console.log("Error", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        // clears input submit
        e.target.reset();
      });
  };
  const handleDelete = (ID) => {
    console.log(ID)
    // delGrocery(ID);
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log("Error", err), setError(true);
    // })
    // .finally(setLoading(false));
  };
  return (
    <div className="notecontainer">
      <h1>Shopping List</h1>

      <form onSubmit={handlePost} className="note">
        <label>
          Add item
          <input type="text" onChange={(e) => setPost(e.target.value)} />
        </label>
        <input type="submit" value="Add to list" />
      </form>

      {items &&
        items.records
          .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
          .map((v) => (
            <div key={v.id} className="note">
              <h2>{v.fields.vare}</h2>
              <p>{new Date(v.createdTime).toLocaleString()}</p>
              <div onClick={() => handleDelete(v.id)}>Delete</div>
            </div>
          ))}
      {loading && <Loading />}
    </div>
  );
};

export default ShoppingListPage;
