import React from "react";

const Person = ({ p }) => {
  // const Person = (props) => {
  // let p = props.p
  return (
    <div>
      {/* print out a person from SW */}
      <div>
        <h2>{p.name}</h2>
        <p>{p.height} cm</p>
        <p>{p.mass} kg</p>
        <p className="Capitalize"> Gender {p.gender}</p>
      </div>
    </div>
  );
};

export default Person;
