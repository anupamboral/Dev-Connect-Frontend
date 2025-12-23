import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const isPremiumUser = useSelector((store) => store.premium.isPremiumUser); //! to display the premium user icon we written the condition "user.data.isPremiumUser || isPremiumUser && tick"  this is written because when the user is buying premium then premium slice slice gets updated not the user slice , but when the user is already a premium user and opening website after some days , then user slice with updated isPremiumUser will be called in the first load, so we written the condition like this , because either the user is buying the premium pack or coming after some time, in both cases the premium badge in the navbar gets displayed immediately.

  console.log(user);
  //* to log out the user by clearing the token and cookie and redux store user data and redirecting the user to the log in page
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    //* we don't need to show the successful logout message, so we have not saved the returned response into any constant
    await axios.post(
      BASE_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    ); //* first arg is for the url, second arg {} is for body , and we are not sending any data for this api call, and third arg is for options , in this wew are setting  withCredentials:true to send the cookies and token to the server

    //* dispatching action to empty the user data from the redux store
    dispatch(removeUser());

    //* navigating user to login page
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl -ml-4">
          Dev🤝Connect
        </Link>
      </div>
      {user && (
        <div className="flex gap-0.5">
          <div className="flex mt-2">
            <p>Welcome {user.data.firstName}</p>
            {
              (user.data.isPremiumUser || isPremiumUser) && (
                <span title="Premium user">
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
                </span>
              ) //*the comment of isPremiumUser useSelector in the top porting to understand this condition
            }
          </div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.data.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/">Feed Page</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">
                  Premium
                  <span className="badge">New✨✨</span>
                </Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
