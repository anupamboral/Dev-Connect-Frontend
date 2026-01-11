import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionsSlice";
import axios from "axios";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
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
    fetchConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(user);

  if (!connections) return;
  if (connections.length === 0) return <h1>No connection found</h1>;

  return (
    connections && (
      <div className="mb-[-1720px] pb-4">
        <div className=" flex justify-center">
          <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
            Connections
          </h1>
        </div>
        <div className="max-h-[1000px] max-w-[90dvw] min-h-[80dvh] mx-auto   border-2 border-cyan-400 px-2 overflow-scroll py-6">
          {connections.map((connection) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="mb-4 lg:mx-24 bg-base-300 rounded-4xl mx-6"
              >
                <div className="rounded-4xl">
                  <div
                    role="alert"
                    className="alert bg-base-300 alert-vertical sm:alert-horizontal"
                  >
                    <div className=" self-start">
                      <img
                        className="h-36 w-36 rounded-4xl"
                        src={connection.photoUrl}
                        alt="userImg"
                      />
                    </div>
                    <div className="flex flex-col  justify-start">
                      <div className="flex justify-center lg:justify-start">
                        <h2
                          className={`self-center lg:self-start  card-title   ${
                            connection.isPremiumUser
                              ? "ml-6 lg:ml-0 lg:mt-0 -mt-4"
                              : "ml-0"
                          }`}
                        >
                          {connection.firstName + " " + connection.lastName}
                        </h2>

                        {connection.isPremiumUser && (
                          <span
                            title="Premium user"
                            className=" self-end bg-base-300 ml-4 p-2 lg:-mt-3 -mt-3  -mr-4 lg:mr-0"
                          >
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
                      {connection?.age && connection?.gender && (
                        <p
                          className={`text-xs uppercase font-semibold opacity-60  ${
                            connection.isPremiumUser
                              ? "lg:-mt-2  -mt-4"
                              : "mt-0"
                          }`}
                        >{`Age: ${connection?.age} , ${connection?.gender}`}</p>
                      )}
                      <p className="text-white">{connection.about}</p>
                    </div>
                    <Link
                      to={
                        "/chat/" +
                        connection._id +
                        "/" +
                        (connection.firstName + " " + connection.lastName)
                      }
                    >
                      <button className="btn btn-secondary" type="button">
                        Chat
                      </button>
                    </Link>
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

export default Connections;
