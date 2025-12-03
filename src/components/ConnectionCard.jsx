import React from "react";

const ConnectionCard = ({ connection }) => {
  console.log(connection);
  return (
    <div className="mb-4 lg:mx-48 bg-base-300 rounded-4xl mx-6">
      <div className="flex  justify-center rounded-4xl">
        <div
          role="alert"
          className="  alert bg-base-300 alert-vertical sm:alert-horizontal"
        >
          <img
            className="h-36 w-36 rounded-4xl"
            src={connection.data.photoUrl}
            alt="Shoes"
          />
          <div className="flex flex-col  align-">
            <h2 className="self-center md:self-start  card-title">
              {connection.data.firstName + " " + connection.data.lastName}
            </h2>
            {connection.data.age && connection.data.gender && (
              <p>{`Age: ${connection.data.age} , ${connection.data.gender}`}</p>
            )}
            <p className="text-white">{connection.data.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
