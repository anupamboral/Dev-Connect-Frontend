import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  //* importing dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //* state variables to keep track what user is typing(binding state with ui components)
  const [emailId, setEmailId] = useState("om@swami.com");
  const [password, setPassword] = useState("OmSwami@336");

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/signin",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      //* setting this withCredentials to true is important to save the cookies into browser.either it will send cookies but not save in the browser.
      console.log(data.data);
      //* dispatching action to add the returned user data to the userSlice in the redux store
      dispatch(addUser(data.data));
      //* navigating to feed(/) page
      navigate("/");
    } catch (err) {
      navigate("/error", {
        state: { errorMessage: err.message, errorState: err.state },
      });
      console.error(err.message);
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <div className="card bg-base-300 w-96 shadow-sm flex justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Log In</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId</legend>
            <input
              type="text"
              className="input"
              placeholder="email@.com"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="TypeStrongPass@234"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <div className="card-actions my-4  justify-center">
            <button className="btn btn-primary flex " onClick={handleLogin}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
