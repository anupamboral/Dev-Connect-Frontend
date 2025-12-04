import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import EditCard from "./EditProfile";

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
      // console.log(res);
      //* adding data to the store(feedSlice)
      dispatch(addFeed(res.data.data));
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

  return (
    feed && (
      <div className="flex justify-center ">
        <UserCard feed={feed[0]} buttonDisplay={true} emailDisplay={false} />
      </div>
    )
  );
};

export default Feed;
