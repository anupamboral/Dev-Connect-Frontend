const UserCard = (props) => {
  console.log(props.feed);
  const { firstName, lastName, age, about, skills, photoUrl, gender } =
    props.feed;
  console.log(about);
  return (
    <div className="card bg-base-300 w-96 shadow-sm m-2">
      <figure>
        <img className="h-80 w-86" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{`Age: ${age} , ${gender}`}</p>}
        <p className="text-white">{about}</p>
        <div className="mb-8">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li className=" text-lg font-bold mr-1">Skills:-</li>
            {skills &&
              skills.map((skill) => (
                <li className="btn-sm mx-1 bg-green-400 text-black p-1 font-bold rounded  ">
                  {skill}
                </li>
              ))}
          </ul>
        </div>
        <div className="card-actions justify-center ">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary ml-2">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
