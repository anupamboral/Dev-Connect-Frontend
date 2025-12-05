import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogInForm, setIsLogInForm] = useState(true);

  //* in the log in page , if the user enter some wrong data then it will show the error in the developer console but we have noway to show the error in the ui, so let's add a p tag above the login button, where will show the error, and this button will be dynamic, so we will make state variable for error, and mention that state variable in this paragraph tag, and where we are fetching the data for login , so in the handleLogIn function 's catch block , we will use setError() function to set the error message, so initial error value will be empty, that's why the p tag will hidden , but whenever some error will happen it because of setError function the error variable's value will be set and error will display on the ui.
  //* state variable to keep track of the error in the login page
  const [error, setError] = useState("");
  //* importing dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //* state variables to keep track what user is typing(binding state with ui components)
  const [emailId, setEmailId] = useState("om@swami.com");
  const [password, setPassword] = useState("OmSwami@336");

  const handleLogin = async () => {
    try {
      setError(""); //* if error happened because of some validation error and after correcting the error if the user retry then the old error message should be cleared , that's why at the top to this handler we cleared the error first.
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
      setError(err.response ? err.response.data.message + "!!!!" : err.message);
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <div className="card bg-base-300 w-96 shadow-sm flex justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {isLogInForm ? "Log In" : "Sign Up"}
          </h2>
          {!isLogInForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </>
          )}
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
          <p className="text-sm text-red-500">{error}</p>
          <div className=" card-actions my-4  justify-center">
            <button className="btn btn-primary flex " onClick={handleLogin}>
              Log In
            </button>
          </div>
          <p
            onClick={() => {
              setIsLogInForm((value) => !value);
            }}
            className=" m-auto text-sm text-cyan-500 cursor-pointer underline"
          >
            {isLogInForm
              ? "New User? Sign up here"
              : "Existing User? Log In Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
