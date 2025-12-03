import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addRequests } from "../utils/requests";

const Requests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

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
        <div className="max-h-[1000px] max-w-[90dvw] min-h-[80dvh] lg:mx-auto overflow-scroll border-2 border-cyan-400 px-2 py-6">
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
                        src={request.photoUrl}
                        alt="Shoes"
                      />
                    </div>
                    <div className="flex flex-col  align-">
                      <h2 className="self-center md:self-start  card-title">
                        {request.firstName + " " + request.lastName}
                      </h2>
                      {request.age && request.gender && (
                        <p className="text-xs uppercase font-semibold opacity-60">{`Age: ${request.age} , ${request.gender}`}</p>
                      )}
                      <p className="text-white">{request.about}</p>
                    </div>
                    <div className="flex md:flex-col ">
                      <button className="btn btn-sm btn-secondary lg:mt-2 my-2  mx-2">
                        Accept
                      </button>
                      <button className="btn btn-sm btn-primary my-2 mx-2">
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
/*      <div className="mb-4 lg:mx-48 bg-base-300 rounded-4xl mx-6">
        <div className="flex bg-base-300 justify-center rounded-4xl">
          <div
            role="alert"
            className="  alert bg-base-300 alert-vertical sm:alert-horizontal"
          >
            <img
              className="h-36 w-36 rounded-4xl"
              src={user.data.photoUrl}
              alt="Shoes"
            />
            <div className="flex flex-col  align-">
              <h2 className="self-center md:self-start  card-title">
                {user.data.firstName + " " + user.data.lastName}
              </h2>
              {user.data.age && user.data.gender && (
                <p>{`Age: ${user.data.age} , ${user.data.gender}`}</p>
              )}
              <p className="text-white">{user.data.about}</p>
            </div>

            <div className="flex md:flex-col ">
              <button className="btn btn-sm btn-secondary lg:mt-2 my-2  mx-2">
                Accept
              </button>
              <button className="btn btn-sm btn-primary my-2 mx-2">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>*/
