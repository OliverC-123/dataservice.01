import React, { useState, useEffect } from "react";
import Loading from "./helpers/Loading";
import "../indkoeb.scss";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillPlusCircle,
} from "react-icons/ai";
import {
  getGrocery,
  postGrocery,
  delGrocery,
  patchGrocery,
} from "./helpers/Airtableapi";

const ShoppingListPage = () => {
  // useStates
  const [items, setItems] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // useState to update useEffect
  const [update, setUpdate] = useState(false);

  // useState to post item
  const [post, setPost] = useState();

  // useState for edit
  const [edit, setEdit] = useState();

  // useState for add item
  const [add, setAdd] = useState();
  // useEffect
  useEffect(() => {
    // setItems();
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
        e.target.reset(); //empty input area
        setItems(); // empty state to not post multiple times
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
  // handleDelete deletes items from AirTable list
  const handleDelete = (ID) => {
    // window.confirm("") to confirm deleting an item
    if (window.confirm("Do you wish to permanently delete this?") === true) {
      console.log(ID);
      setLoading(true);
      delGrocery(ID)
        .then((data) => {
          console.log(data);
          setError();
          setUpdate(!update);
        })
        .catch((err) => {
          console.log("Error", err);
          setError(true);
        })
        .finally(setLoading(false));
    }
  };
  // handleEdit patches items from AirTable list

  const handleEdit = (e) => {
    // prevents site from default reloading on submit
    e.preventDefault();
    setLoading(true);

    // edits an item to shopping list

    const editItem = {
      fields: {
        vare: post,
      },
    };

    // call PATCH to api
    patchGrocery(editItem, edit.id)
      .then((data) => {
        console.log(data);
        setError();
        setUpdate(!update);
        e.target.reset(); //empty input area
        setItems(); // empty state to not post multiple times
        setEdit(); // empty state to edit
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

  return (
    <div className="notecontainer">
      <h1>
        Shopping List &emsp;&emsp;&emsp;&emsp; Add item
        <AiFillPlusCircle onClick={() => setAdd(items.records)} />
      </h1>
      {/* form to add */}
      {add && (
        <form onSubmit={handlePost} className="note">
          <label>
            <input type="text" onChange={(e) => setPost(e.target.value)} />
          </label>
          <input type="submit" value="Add to list" />
        </form>
      )}
      {/* form to edit */}
      {edit && (
        <form onSubmit={handleEdit} className="note">
          <label>
            Edit item
            <input
              // key to reset input field
              key={edit.fields.vare}
              type="text"
              id="edit"
              defaultValue={edit.fields.vare}
              onChange={(e) => setPost(e.target.value)}
            />
          </label>
          <input type="submit" value="Edit item" />
          <button
            type="button"
            onClick={() => {
              setPost();
              setEdit();
            }}
          >
            Regret
          </button>
        </form>
      )}

      {items &&
        items.records
          .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
          .map((v) => (
            <div key={v.id} className="note">
              <h2>{v.fields.vare}</h2>
              <p>{new Date(v.createdTime).toLocaleString()}</p>
              <div onClick={() => handleDelete(v.id)}>Delete</div>
              <div className="retslet">
                <AiOutlineDelete onClick={() => handleDelete(v.id)} />
                <AiOutlineEdit
                  onClick={() => {
                    setEdit(v);
                    window.scrollTo({ top: 200, behavior: "smooth" });
                  }}
                />
              </div>
            </div>
          ))}
      {loading && <Loading />}
    </div>
  );
};

export default ShoppingListPage;
