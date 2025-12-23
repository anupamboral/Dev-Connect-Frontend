import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFeedUser } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(props.feed);
  const {
    firstName,
    lastName,
    age,
    about,
    skills,
    photoUrl,
    gender,
    emailId,
    _id,
    isPremiumUser,
  } = props.feed;

  const { buttonDisplay, emailDisplay } = props;

  const handleSendRequest = async (status, userId) => {
    console.log(userId);
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(removeFeedUser(userId));
    } catch (err) {
      navigate("/error", {
        state: {
          errorMessage: err.response
            ? err.response.data.message + `(${err.response.statusText})`
            : err.message,
          errorState: err.response ? `Status ` + err.response.status : err.code,
        },
      });
      console.error(err.message);
    }
  };

  // console.log(props);
  // console.log(about);
  // console.log(crypto.randomUUID());
  return (
    <div className="  self-center card bg-base-300 w-96 shadow-sm m-2">
      <figure>
        <img className="h-72 w-92" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {isPremiumUser && (
            <span title="Premium user" className=" bg-base-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <polygon
                  fill="#42a5f5"
                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                ></polygon>
              </svg>
            </span>
          )}
        </div>

        {emailDisplay && <p className="text-white">Email id:- {emailId}</p>}
        {age && gender && (
          <p className="text-xs uppercase font-semibold opacity-60">{`Age: ${age} , ${gender}`}</p>
        )}
        <p className="text-white">{about}</p>

        <div className="mb-1">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li className=" text-lg font-bold mr-1">Skills:-</li>
            {skills &&
              skills.map((skill) => (
                <li
                  key={crypto.randomUUID()}
                  className="btn-sm mb-1 mx-1 bg-green-400 text-black p-1 font-bold rounded  "
                >
                  {skill}
                </li>
              ))}
          </ul>
        </div>
        {buttonDisplay && (
          <div className="card-actions justify-center ">
            <button
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
              className="btn btn-primary"
            >
              Ignore
            </button>
            <button
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
              className="btn btn-secondary ml-2"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
