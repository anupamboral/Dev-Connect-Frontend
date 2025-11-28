import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
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

    //*navigating user to login page
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev🤝Connect
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="mt-2">Welcome {user.data.firstName}</p>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto ml-4"
          />

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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
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
