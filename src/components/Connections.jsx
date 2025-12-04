import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionsSlice";
import axios from "axios";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

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
    <div>
      <div className=" flex justify-center">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          {" "}
          Connections
        </h1>
      </div>
      <div className="max-h-[1000px] min-h-[80dvh] max-w-[90dvw]  lg:mx-auto overflow-scroll border-2 border-cyan-400 px-2 py-6">
        {connections.map((connection) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="mb-4 lg:mx-24 bg-base-300 rounded-4xl mx-6"
            >
              <div className="flex  justify-start rounded-4xl">
                <div
                  role="alert"
                  className=" flex justify-around   alert bg-base-300 alert-vertical sm:alert-horizontal"
                >
                  <img
                    className="h-36 w-36 rounded-4xl"
                    src={connection.photoUrl}
                    alt="Shoes"
                  />
                  <div className="flex flex-col  justify-start">
                    <h2 className=" md:self-start  card-title">
                      {connection.firstName + " " + connection.lastName}
                    </h2>
                    {connection.age && connection.gender && (
                      <p>{`Age: ${connection.data.age} , ${connection.gender}`}</p>
                    )}
                    <p className="text-white">{connection.about}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
