import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPremiumStatus } from "../utils/premiumSlice";

const Premium = () => {
  const isPremiumUser = useSelector((store) => store.premium.isPremiumUser); //*boolean to check if the user is premium or not
  const premiumStatus = useSelector((store) => store.premium.membershipType); //*silver/gold (string) to get the type of premium membership the user has
  // const [isPremiumUser, setIsPremiumUser] = useState(false); //* to keep track if the user is premium or not
  // const [premiumStatus, setPremiumStatus] = useState(""); //* to show the type of premium membership
  const dispatch = useDispatch();
  useEffect(() => {
    verifyPremiumUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //* to run only once on component mount and load the premium status

  const verifyPremiumUser = async () => {
    console.log("verifyUser called");
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.isPremiumUser) {
        dispatch(addPremiumStatus(res.data)); //* instead of setting local state, dispatching action to update redux store, so when the user goes to another page of our website and comes back to premium page again we don't have to make api call again to check if the user is premium or not, we can just get it from the store.
        // setIsPremiumUser(true);
        // setPremiumStatus(res.data.membershipType);
      }
    } catch (error) {
      console.error("Error verifying premium user:", error);
    }
  };
  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: plan },
      { withCredentials: true }
    );
    console.log(order);

    //* opening payment diallage box
    const { amount, currency, keyId, notes, orderId } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits.
      currency: currency,
      name: "Dev Connect",
      description: "Test Transaction",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: 9999999999, //* for testing
      },
      theme: {
        color: "#0000cc",
      },
      handler: verifyPremiumUser, //* this will be automatically called after payment is verified
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isPremiumUser ? (
    <div className="flex justify-center lg:w-[98dvw] mb-[-1500px] pb-4">
      <div className=" lg:flex justify-center m-auto mt-4 lg:mt-10">
        <div className="card w-96 bg-base-300 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">
              congratulations
            </span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">{`Your are a ${premiumStatus} user`}</h2>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Chat with other people</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {premiumStatus === "gold"
                    ? "Infinite connection requests per day"
                    : "100 connection requests per day"}
                </span>
              </li>
              <li className="flex -ml-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
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
                <span className="mt-0.5 ml-1">Blue Tick</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  {premiumStatus === "gold" ? "6 months" : "3 months"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center lg:w-[98dvw]">
      <div className=" lg:flex justify-center m-auto mt-4 lg:mt-10">
        <div className="card w-96 bg-base-300 shadow-sm mr-4 lg:mb-0 mb-4">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Silver Premium</h2>
              <span className="text-xl">₹500/year</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Chat with other people</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>100 connection requests per day</span>
              </li>
              <li className="flex -ml-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
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
                <span className="mt-0.5 ml-1">Blue Tick</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>3 months</span>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => {
                  handleBuyClick("silver");
                }}
                className="btn btn-primary btn-block"
              >
                Buy silver
              </button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-300 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Valuable</span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Gold Premium</h2>
              <span className="text-xl">₹700/year</span>
            </div>
            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Chat with other people</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Infinite connection requests per day</span>
              </li>
              <li className="flex -ml-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
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
                <span className="mt-0.5 ml-1">Blue Tick</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>6 months</span>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => {
                  handleBuyClick("gold");
                }}
                className="btn btn-secondary btn-block"
              >
                Buy Gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
