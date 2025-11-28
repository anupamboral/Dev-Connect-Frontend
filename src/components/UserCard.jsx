import React from "react";

const UserCard = (props) => {
  console.log(props.feed);
  const { firstName, lastName, age, about, skills, photoUrl, gender } =
    props.feed;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{`Age: ${age} , ${gender}`}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center ">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary ml-2">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
