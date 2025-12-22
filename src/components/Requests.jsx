import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const handleReviewRequest = async (status, connectionRequestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + connectionRequestId,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(removeRequest(connectionRequestId));
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

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res?.data?.data || []));
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

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return; //*early return
  if (requests.length === 0)
    return <h1 className="text-center text-3xl">No connection found</h1>;

  return (
    requests && (
      <div>
        <div className=" flex justify-center mx-auto">
          <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
            Requests
          </h1>
        </div>
        <div className="max-h-[1000px] max-w-[90dvw] min-h-[80dvh] mx-auto overflow-scroll border-2 border-cyan-400 px-2 py-6">
          {requests.map((request) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="mb-4 lg:mx-24 bg-base-300 rounded-4xl mx-6"
              >
                <div className=" bg-base-300 rounded-4xl">
                  <div
                    role="alert"
                    className="  alert bg-base-300 alert-vertical sm:alert-horizontal"
                  >
                    <div className=" self-start">
                      <img
                        className="h-36 w-36 rounded-4xl"
                        src={request.fromUserId.photoUrl}
                        alt="Shoes"
                      />
                    </div>
                    <div className="flex flex-col  ">
                      <div className="flex justify-center lg:justify-start">
                        <h2
                          className={`self-center lg:self-start  card-title  ${
                            request.fromUserId.isPremiumUser
                              ? "ml-6 lg:ml-0 lg:mt-0 -mt-4"
                              : "ml-0"
                          }`}
                        >
                          {request.fromUserId.firstName +
                            " " +
                            request.fromUserId.lastName}
                        </h2>
                        {request.fromUserId.isPremiumUser && (
                          <span
                            title="Premium user"
                            className={`self-end  bg-base-300 ml-4 p-2 lg:-mt-3 -mt-3   -mr-4 lg:mr-0 `}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="28"
                              height="28"
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

                      {request.fromUserId.age && request.fromUserId.gender && (
                        <p
                          className={`text-xs uppercase font-semibold opacity-60  ${
                            request.fromUserId.isPremiumUser
                              ? "lg:-mt-2  -mt-4"
                              : "mt-0"
                          }`}
                        >{`Age: ${request.fromUserId.age} , ${request.fromUserId.gender}`}</p>
                      )}
                      <p className="text-white">{request.fromUserId.about}</p>
                    </div>
                    <div className="flex md:flex-col ">
                      <button
                        onClick={() => {
                          handleReviewRequest("accepted", request._id);
                        }}
                        className="btn btn-sm btn-secondary lg:mt-2 my-2  mx-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          handleReviewRequest("rejected", request._id);
                        }}
                        className="btn btn-sm btn-primary my-2 mx-2"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Requests;
