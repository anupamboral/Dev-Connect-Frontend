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
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
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
