import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { addPremiumStatus } from "../utils/premiumSlice";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      //* fetching user data when user is logged in and token is valid that's why we are setting withCredentials to true to send the token to server
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res.data);
      //* saving data in to userSlice(redux stare)
      dispatch(addUser(res.data));
      //* if the user is premium then , when we are fetching the feed data in in the first load immediately from here also we will update the premium status
      res.data.data.isPremiumUser
        ? dispatch(
            addPremiumStatus({
              isPremiumUser: res.data.data.isPremiumUser,
              membershipType: res.data.data.membershipType,
            })
          )
        : null;
    } catch (err) {
      if (err.status === 401) {
        console.log(err);
        //* if token is not valid then then sending the user to login page
        return navigate("/login"); //* here using return keyword is necessary , if we write return then only it will navigate to login page and stop further execution , but we don't write return then it continue the execution and execute below code , which will again redirect the user to error, and that should not happen in case of 401 unauthorized error, the below code should only execute when some other error happens like 404, 400 or any else but not 401 , so writing return is important to stop further execution
      }
      //* if any other error happens(also sending error data because in declarative mode of react router we can't use useRouterError hook )
      console.log(err);
      navigate("/error", {
        state: {
          errorMessage: err.response
            ? err.response.data.message + `(${err.response.statusText})`
            : err.message,
          errorState: err.response ? `Status ` + err.response.status : err.code,
        },
      });
      console.log(err.message);
    }
  };

  //* calling useEffect hook with empty array , whenever this component will load first time it will call this useEffect and the fetchUser function will be called and if the token is present then the userData will be fetched and added to the redux store , so even the user refresh the page , his profile will be still logged in until the token or cookie expires. and if the token is expired then user will be redirected to the login page.
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[1800px]">
  
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
