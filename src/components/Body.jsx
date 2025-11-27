import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      //* fetching user data when user is logged in and token is valid that's why we are setting withCredentials to true to send the token to server
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      //* saving data in to userSlice(redux stare)
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        //* if token is not valid then then sending the user to login page
        navigate("/login");
      }
      //* if any other error happens(also sending error data because in declarative mode of react router we can't use useRouterError hook )
      navigate("/error", {
        state: { errorMessage: err.message, errorState: err.state },
      });
      console.error(err.message);
    }
  };

  //* calling useEffect hook with empty array , whenever this component will load first time it will call this useEffect and the fetchUser function will be called and if the token is present then the userData will be fetched and added to the redux store , so even the user refresh the page , his profile will be still logged in until the token or cookie expires. and if the token is expired then user will be redirected to the login page.
  useEffect(() => {
    fetchUser();
  });

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
