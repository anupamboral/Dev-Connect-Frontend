import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const fetchFeedData = async () => {
    //! when we are making a get call, we don't pass anything inside body as it is a get call , so second param for body which is a { } is not required, so for get call second param will be object for options where can set the withCredentials to true, but for post call always the second param will be for request body, and third param will be for options.
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      //* adding data to the store(feedSlice)(when there is no new user is found and api responded empty array them setting the feed state to null which will show no new users found message)
      res.data.data.length === 0
        ? dispatch(addFeed(null))
        : dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
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

  useEffect(() => {
    fetchFeedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //* empty dependency array to render it only on first mount

  //* logic to show no new users found when the api responded empty array and feed slice is set to null
  if (!feed) {
    //* Early return
    return (
      <div className=" flex justify-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          No new Users Found
        </h1>
      </div>
    );
  }

  //* logic to show the skeleton card  when feed array is empty , so fetch new users
  if (feed.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          Load new users
        </h1>

        <div
          onClick={() => {
            fetchFeedData();
          }}
          className="flex w-74 flex-col gap-4 mt-4"
        >
          <div className="skeleton h-44 w-full"></div>

          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <button className="btn btn-primary bg-cyan-400 p-2 text-black ">
            Show New Users
          </button>
        </div>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center ">
        <UserCard feed={feed[0]} buttonDisplay={true} emailDisplay={false} />
      </div>
    )
  );
};

export default Feed;
